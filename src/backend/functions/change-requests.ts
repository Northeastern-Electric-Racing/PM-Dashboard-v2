import { Context } from 'aws-lambda';
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

const getChangeRequestByID: ApiRouteFunction = (params: { id: number }) => {
  const requestedCR: ChangeRequest | undefined = exampleAllChangeRequests.find(
    (cr: ChangeRequest) => {
      return cr.id == params.id;
    }
  );
  if (requestedCR === undefined) {
    return { statusCode: 404, body: 'Could not find the requested change request.' };
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestedCR)
  };
};

const routes: ApiRoute[] = [
  {
    path: apiRoutes.CHANGE_REQUESTS,
    httpMethod: 'GET',
    func: getAllChangeRequests
  },
  {
    path: apiRoutes.CHANGE_REQUESTS_BY_ID,
    httpMethod: 'GET',
    func: getChangeRequestByID
  }
];

export async function handler(event: any, context: Context) {
  try {
    return routeMatcher(routes, event, context);
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}
