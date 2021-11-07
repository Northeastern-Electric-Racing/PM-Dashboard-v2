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
  buildServerFailureResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  exampleAllWorkPackages,
  routeMatcher,
  WbsNumber,
  WorkPackage
} from 'utils';

// Fetch all users
const getAllWorkPackages: ApiRouteFunction = () => {
  return buildSuccessResponse(exampleAllWorkPackages);
};

// Fetch the work package for the specified WBS number
const getSingleWorkPackage: ApiRouteFunction = (params: { wbs: string }) => {
  const parseWbs: number[] = params.wbs.split('.').map((str) => parseInt(str));
  const parsedWbs: WbsNumber = {
    car: parseWbs[0],
    project: parseWbs[1],
    workPackage: parseWbs[2]
  };
  const requestedWorkPackage: WorkPackage | undefined = exampleAllWorkPackages.find(
    (wp: WorkPackage) => {
      return (
        wp.wbsNum.car === parsedWbs.car &&
        wp.wbsNum.project === parsedWbs.project &&
        wp.wbsNum.workPackage === parsedWbs.workPackage
      );
    }
  );
  if (requestedWorkPackage === undefined) {
    return buildNotFoundResponse('work package', `WBS # ${params.wbs}`);
  }
  return buildSuccessResponse(requestedWorkPackage);
};

// Define all valid routes for the endpoint
const routes: ApiRoute[] = [
  {
    path: `${API_URL}${apiRoutes.WORK_PACKAGES}`,
    httpMethod: 'GET',
    func: getAllWorkPackages
  },
  {
    path: `${API_URL}${apiRoutes.WORK_PACKAGES_BY_WBS}`,
    httpMethod: 'GET',
    func: getSingleWorkPackage
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
