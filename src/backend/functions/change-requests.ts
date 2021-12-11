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
  StageGateChangeRequest
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
    where: { crId: crId },
    ...relationArgs
  });
  if (requestedCR === null) {
    return buildNotFoundResponse('change request', `#${crId}`);
  }
  return buildSuccessResponse(changeRequestTransformer(requestedCR));
};

const routes: ApiRoute[] = [
  {
    path: API_URL + apiRoutes.CHANGE_REQUESTS,
    httpMethod: 'GET',
    func: getAllChangeRequests
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
  } catch (error) {
    console.error(error);
    return buildServerFailureResponse(error.message);
  }
};

export { handler };
