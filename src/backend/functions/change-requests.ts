/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { PrismaClient, Prisma, CR_Type, Scope_CR_Why_Type } from '@prisma/client';
import {
  ApiRoute,
  ApiRouteFunction,
  API_URL,
  apiRoutes,
  routeMatcher,
  ChangeRequest,
  buildSuccessResponse,
  buildNotFoundResponse,
  buildServerFailureResponse,
  ChangeRequestType,
  ChangeRequestReason,
  StandardChangeRequest,
  ActivationChangeRequest,
  StageGateChangeRequest,
  buildClientFailureResponse
} from 'utils';

const prisma = new PrismaClient();

const relationArgs = Prisma.validator<Prisma.Change_RequestArgs>()({
  include: {
    submitter: true,
    wbsElement: true,
    changes: {
      include: {
        implementer: true
      }
    },
    scopeChangeRequest: { include: { why: true } },
    stageGateChangeRequest: true,
    activationChangeRequest: { include: { projectLead: true, projectManager: true } }
  }
});

const convertCRScopeWhyType = (whyType: Scope_CR_Why_Type): ChangeRequestReason =>
  ({
    ESTIMATION: ChangeRequestReason.Estimation,
    SCHOOL: ChangeRequestReason.School,
    MANUFACTURING: ChangeRequestReason.Manufacturing,
    RULES: ChangeRequestReason.Rules,
    OTHER_PROJECT: ChangeRequestReason.OtherProject,
    OTHER: ChangeRequestReason.Other
  }[whyType]);

const convertChangeRequestType = (type: CR_Type): ChangeRequestType =>
  ({
    ISSUE: ChangeRequestType.DesignIssue,
    DEFINITION_CHANGE: ChangeRequestType.NewFunction,
    OTHER: ChangeRequestType.Other,
    STAGE_GATE: ChangeRequestType.StageGate,
    ACTIVATION: ChangeRequestType.Activation
  }[type]);

const changeRequestTransformer = (
  changeRequest: Prisma.Change_RequestGetPayload<typeof relationArgs>
): ChangeRequest | StandardChangeRequest | ActivationChangeRequest | StageGateChangeRequest => {
  const wbsNum = {
    car: changeRequest.wbsElement.carNumber,
    project: changeRequest.wbsElement.projectNumber,
    workPackage: changeRequest.wbsElement.workPackageNumber
  };
  return {
    ...changeRequest,
    type: convertChangeRequestType(changeRequest.type),
    dateReviewed: changeRequest.dateReviewed ?? undefined,
    accepted: changeRequest.accepted ?? undefined,
    reviewNotes: changeRequest.reviewNotes ?? undefined,
    dateImplemented: changeRequest.changes.reduce(
      (res: Date | undefined, change) =>
        !res || change.dateImplemented.valueOf() > res.valueOf() ? change.dateImplemented : res,
      undefined
    ),
    implementedChanges: changeRequest.changes.map((change) => ({
      ...change,
      wbsNum
    })),
    wbsNum,
    ...changeRequest.scopeChangeRequest,
    why: changeRequest.scopeChangeRequest?.why.map((why) => ({
      ...why,
      reason: convertCRScopeWhyType(why.type)
    })),
    ...changeRequest.activationChangeRequest,
    ...changeRequest.stageGateChangeRequest
  };
};

const getAllChangeRequests: ApiRouteFunction = async () => {
  const changeRequests = await prisma.change_Request.findMany(relationArgs);
  return buildSuccessResponse(changeRequests.map(changeRequestTransformer));
};

// Fetch the specific change request by its integer ID
const getChangeRequestByID: ApiRouteFunction = async (params: { id: string }) => {
  const crId: number = parseInt(params.id);
  const requestedCR = await prisma.change_Request.findUnique({
    where: { crId },
    ...relationArgs
  });
  if (requestedCR === null) {
    return buildNotFoundResponse('change request', `#${crId}`);
  }
  return buildSuccessResponse(changeRequestTransformer(requestedCR));
};

const createNewChangeRequest: ApiRouteFunction = async (_params, event) => {
  if (event.body === undefined) {
    return buildClientFailureResponse('No data for CR creation.');
  }
  const body = JSON.parse(event.body!);
  if (
    body.submitterId === undefined ||
    body.wbsElementId === undefined ||
    body.type === undefined
  ) {
    return buildClientFailureResponse('Missing common CR field(s).');
  }
  if (!(body.submitterId >= 0) || !(body.wbsElementId >= 0)) {
    return buildClientFailureResponse('ID field(s) must be integers.');
  }
  if (
    body.type === CR_Type.ISSUE ||
    body.type === CR_Type.DEFINITION_CHANGE ||
    body.type === CR_Type.OTHER
  ) {
    if (
      body.what === undefined ||
      body.scopeImpact === undefined ||
      body.timelineImpact === undefined ||
      body.budgetImpact === undefined ||
      body.why === undefined
    ) {
      return buildClientFailureResponse('Missing standard CR field(s).');
    }
    console.log(body.timelineImpact >= 0);
    if (!(body.timelineImpact >= 0) || !(body.budgetImpact >= 0)) {
      return buildClientFailureResponse('timeline and budget impact field(s) must be integers.');
    }
    if (!(body.why instanceof Array)) {
      return buildClientFailureResponse('why field must be an array.');
    }
    if (
      body.why.filter((ele: any) => ele.explain === undefined || ele.type === undefined).length > 0
    ) {
      return buildClientFailureResponse('why field objects must have explain and type.');
    }
    const createdChangeRequest = await prisma.change_Request.create({
      data: {
        submitter: { connect: { userId: body.submitterId } },
        wbsElement: { connect: { wbsElementId: body.wbsElementId } },
        type: body.type,
        scopeChangeRequest: {
          create: {
            what: body.what,
            scopeImpact: body.scopeImpact,
            timelineImpact: body.timelineImpact,
            budgetImpact: body.budgetImpact,
            why: { createMany: { data: body.why } }
          }
        }
      }
    });
    return buildSuccessResponse(createdChangeRequest);
  }
  if (body.type === CR_Type.STAGE_GATE) {
    if (body.leftoverBudget === undefined || body.confirmDone === undefined) {
      return buildClientFailureResponse('Missing stage gate CR field(s).');
    }
    if (!(body.leftoverBudget >= 0)) {
      return buildClientFailureResponse('leftoverBudget field must be an integer.');
    }
    if (body.confirmDone !== true && body.confirmDone !== false) {
      return buildClientFailureResponse('confirmDone field must be a boolean.');
    }
    return buildSuccessResponse('stage gate');
  }
  if (body.type === CR_Type.ACTIVATION) {
    if (
      body.projectLeadId === undefined ||
      body.projectManagerId === undefined ||
      body.startDate === undefined ||
      body.confirmDetails === undefined
    ) {
      return buildClientFailureResponse('Missing activation CR field(s).');
    }
    return buildSuccessResponse('activation');
  }
  return buildClientFailureResponse('CR type did not match.');
};

const routes: ApiRoute[] = [
  {
    path: API_URL + apiRoutes.CHANGE_REQUESTS,
    httpMethod: 'GET',
    func: getAllChangeRequests
  },
  {
    path: API_URL + apiRoutes.CHANGE_REQUESTS,
    httpMethod: 'POST',
    func: createNewChangeRequest
  },
  {
    path: API_URL + apiRoutes.CHANGE_REQUESTS_BY_ID,
    httpMethod: 'GET',
    func: getChangeRequestByID
  }
];

// Handler for incoming requests
const handler: Handler = async (event, context) => {
  try {
    return routeMatcher(routes, event, context);
  } catch (error: any) {
    console.error(error);
    return buildServerFailureResponse(error.message);
  }
};

export { handler };
