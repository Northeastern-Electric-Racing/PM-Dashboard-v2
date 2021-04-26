/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Context } from 'aws-lambda';
import {
  ApiRoute,
  ApiRouteFunction,
  apiRoutes,
  API_URL,
  exampleAllUsers,
  routeMatcher,
  User
} from 'utils';

// Fetch all users
const getAllUsers: ApiRouteFunction = () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exampleAllUsers)
  };
};

// Fetch the user for the specified id
const getSingleUser: ApiRouteFunction = (params: { id: string }) => {
  const userId: number = parseInt(params.id);
  const requestedUser: User | undefined = exampleAllUsers.find((usr: User) => usr.id === userId);
  if (requestedUser === undefined) {
    return { statusCode: 404, body: 'Could not find the requested user.' };
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestedUser)
  };
};

// Define all valid routes for the endpoint
const routes: ApiRoute[] = [
  {
    path: `${API_URL}${apiRoutes.USERS}`,
    httpMethod: 'GET',
    func: getAllUsers
  },
  {
    path: `${API_URL}${apiRoutes.USERS_BY_ID}`,
    httpMethod: 'GET',
    func: getSingleUser
  }
];

// Handler for incoming requests
export async function handler(event: any, context: Context) {
  try {
    return routeMatcher(routes, event, context);
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) };
  }
}
