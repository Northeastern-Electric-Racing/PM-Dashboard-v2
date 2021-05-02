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
  routeMatcher
} from 'utils';

const getAllChangeRequests: ApiRouteFunction = () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exampleAllChangeRequests)
  };
};

const getChangeRequestByID: ApiRouteFunction = (params: { id: string }) => {
  const crId: number = parseInt(params.id);
  const requestedCR: ChangeRequest | undefined = exampleAllChangeRequests.find(
    (cr: ChangeRequest) => cr.id === crId
  );
  if (requestedCR === undefined) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Could not find the requested change request.' })
    };
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestedCR)
  };
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
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) };
  }
};

export { handler };
