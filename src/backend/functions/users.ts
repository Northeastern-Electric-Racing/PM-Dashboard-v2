/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { OAuth2Client } from 'google-auth-library';
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
  User,
  buildResponse,
  buildNoAuthResponse,
  Role
} from 'utils';
import { exampleAppAdminUser } from '../../utils/lib/dummy-data';

const COOKIE_DURATION = 4; // in hours

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
  if (!body.id_token) {
    return buildClientFailureResponse('No id_token found for login.');
  }
  const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID);
  const verify = async () => {
    const ticket = await client.verifyIdToken({
      idToken: body.id_token,
      audience: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID
    });
    const payload = ticket.getPayload();
    if (!payload) throw new Error('Auth server response payload invalid');
    const userid = payload['sub']; // google user id
    if (userid !== '106213939999162727811') throw new Error('you are not james');
    // check if user is already in the database via Google ID
    // if yes, register a login
    // if no, register the user and then register a login
    return payload;
  };
  let userToLogIn: User | undefined = exampleAllUsers.find(
    (usr: User) => usr.emailId === 'shmoe.j'
  );
  if (userToLogIn === undefined) {
    return buildNotFoundResponse('user', `${body.emailId}`);
  }
  verify()
    .then((payload) => {
      const createdUser: User = {
        id: 1,
        firstName: payload['given_name']!,
        lastName: payload['family_name']!,
        emailId: payload['email']!,
        firstLogin: new Date(),
        lastLogin: new Date(),
        role: Role.Guest
      };
      userToLogIn = createdUser;
    })
    .catch(console.error);
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
    const result = routeMatcher(routes, event, context);
    return result;
  } catch (error) {
    console.error(error);
    return buildServerFailureResponse(error.message);
  }
};

export { handler };
