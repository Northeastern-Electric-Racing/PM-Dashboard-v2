/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { PrismaClient, Prisma, Scope_CR_Why_Type, WBS_Element } from '@prisma/client';
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
  ChangeRequestReason,
  StandardChangeRequest,
  ActivationChangeRequest,
  StageGateChangeRequest,
  WbsNumber
} from 'utils';

const prisma = new PrismaClient();

const relationArgs = Prisma.validator<Prisma.Change_RequestArgs>()({
  include: {
    submitter: true,
    wbsElement: true,
    reviewer: true,
    changes: {
      include: {
        implementer: true,
        wbsElement: true
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
    DESIGN: ChangeRequestReason.Design,
    MANUFACTURING: ChangeRequestReason.Manufacturing,
    RULES: ChangeRequestReason.Rules,
    INITIALIZATION: ChangeRequestReason.Initialization,
    OTHER_PROJECT: ChangeRequestReason.OtherProject,
    OTHER: ChangeRequestReason.Other
  }[whyType]);

const wbsNumOf = (element: WBS_Element): WbsNumber => ({
  carNumber: element.carNumber,
  projectNumber: element.projectNumber,
  workPackageNumber: element.workPackageNumber
});

const changeRequestTransformer = (
  changeRequest: Prisma.Change_RequestGetPayload<typeof relationArgs>
): ChangeRequest | StandardChangeRequest | ActivationChangeRequest | StageGateChangeRequest => {
  return {
    // all cr fields
    ...changeRequest,
    type: changeRequest.type,
    reviewer: changeRequest.reviewer ?? undefined,
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
      wbsNum: wbsNumOf(change.wbsElement)
    })),
    wbsNum: wbsNumOf(changeRequest.wbsElement),
    // scope cr fields
    ...changeRequest.scopeChangeRequest,
    why: changeRequest.scopeChangeRequest?.why.map((why) => ({
      ...why,
      type: convertCRScopeWhyType(why.type)
    })),
    // activation cr fields
    ...changeRequest.activationChangeRequest,
    // stage gate cr fields
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
  } catch (error: any) {
    console.error(error);
    return buildServerFailureResponse(error.message);
  }
};

export { handler };
