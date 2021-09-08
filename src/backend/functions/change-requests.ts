/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
import {
  ApiRoute,
  ApiRouteFunction,
  API_URL,
  apiRoutes,
  routeMatcher,
  buildSuccessResponse,
  buildNotFoundResponse,
  buildServerFailureResponse
} from 'utils';

const prisma = new PrismaClient();

const getAllChangeRequests: ApiRouteFunction = async () => {
  const changeRequests = await prisma.change_Request.findMany({
    include: {
      submitter: true,
      wbsElement: true
    }
  });
  return buildSuccessResponse(
    changeRequests.map((val) => {
      return {
        ...val,
        ...val.wbsElement,
        wbsNumber: {
          car: val.wbsElement.carNumber,
          project: val.wbsElement.projectNumber,
          workPackage: val.wbsElement.workPackageNumber
        }
      };
    })
  );
};

// Fetch the specific change request by its integer ID
const getChangeRequestByID: ApiRouteFunction = async (params: { id: string }) => {
  const crId: number = parseInt(params.id);
  const requestedCR = await prisma.change_Request.findUnique({
    where: { crId: crId },
    include: {
      submitter: true,
      wbsElement: true,
      scopeChangeRequest: true,
      stageGateChangeRequest: true,
      activationChangeRequest: true
    }
  });
  if (requestedCR === null) {
    return buildNotFoundResponse('change request', `#${crId}`);
  }
  return buildSuccessResponse({
    ...requestedCR,
    ...requestedCR.wbsElement,
    ...requestedCR.scopeChangeRequest,
    ...requestedCR.stageGateChangeRequest,
    ...requestedCR.activationChangeRequest,
    wbsNumber: {
      car: requestedCR.wbsElement.carNumber,
      project: requestedCR.wbsElement.projectNumber,
      workPackage: requestedCR.wbsElement.workPackageNumber
    }
  });
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
