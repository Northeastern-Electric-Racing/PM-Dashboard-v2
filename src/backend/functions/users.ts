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
  buildClientFailureResponse,
  buildServerFailureResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  exampleAllUsers,
  routeMatcher,
  User
} from 'utils';

// Fetch all users
const getAllUsers: ApiRouteFunction = () => {
  return buildSuccessResponse(exampleAllUsers);
};

// Fetch the user for the specified id
const getSingleUser: ApiRouteFunction = (params: { id: string }) => {
  const userId: number = parseInt(params.id);
  const requestedUser: User | undefined = exampleAllUsers.find((usr: User) => usr.id === userId);
  if (requestedUser === undefined) {
    return buildNotFoundResponse('user', `#${params.id}`);
  }
  return buildSuccessResponse(requestedUser);
};

// Log the user in via their emailId
const logUserIn: ApiRouteFunction = (_params, event) => {
  if (!event.body) {
    return buildClientFailureResponse('No user info found for login.');
  }
  const body = JSON.parse(event.body!);
  if (!body.emailId) {
    return buildClientFailureResponse('No emailId found for login.');
  }
  const userToLogIn: User | undefined = exampleAllUsers.find(
    (usr: User) => usr.emailId === body.emailId
  );
  if (userToLogIn === undefined) {
    return buildNotFoundResponse('user', `${body.emailId}`);
  }
  return buildSuccessResponse(userToLogIn);
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
  },
  {
    path: `${API_URL}${apiRoutes.USERS_LOGIN}`,
    httpMethod: 'POST',
    func: logUserIn
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
