/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import {
  ApiRoute,
  ApiRouteFunction,
  API_URL,
  apiRoutes,
  ChangeRequest,
  exampleAllChangeRequests,
  routeMatcher,
  buildSuccessResponse,
  buildNotFoundResponse,
  buildServerFailureResponse
} from 'utils';

const getAllChangeRequests: ApiRouteFunction = () => {
  return buildSuccessResponse(exampleAllChangeRequests);
};

const getChangeRequestByID: ApiRouteFunction = (params: { id: string }) => {
  const crId: number = parseInt(params.id);
  const requestedCR: ChangeRequest | undefined = exampleAllChangeRequests.find(
    (cr: ChangeRequest) => cr.id === crId
  );
  if (requestedCR === undefined) {
    return buildNotFoundResponse('change request', `#${crId}`);
  }
  return buildSuccessResponse(requestedCR);
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
