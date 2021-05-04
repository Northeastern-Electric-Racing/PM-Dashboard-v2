/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import {
  ApiRoute,
  ApiRouteFunction,
  apiRoutes,
  API_URL,
  buildFailureResponse,
  buildSuccessResponse,
  exampleAllWorkPackages,
  routeMatcher
} from 'utils';

// Fetch all users
const getAllWorkPackages: ApiRouteFunction = () => {
  return buildSuccessResponse(exampleAllWorkPackages);
};

// Define all valid routes for the endpoint
const routes: ApiRoute[] = [
  {
    path: `${API_URL}${apiRoutes.WORK_PACKAGES}`,
    httpMethod: 'GET',
    func: getAllWorkPackages
  }
];

// Handler for incoming requests
const handler: Handler = async (event, context) => {
  try {
    return routeMatcher(routes, event, context);
  } catch (error) {
    console.error(error);
    return buildFailureResponse(error.message);
  }
};

export { handler };
