/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
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
  routeMatcher
} from 'utils';

const prisma = new PrismaClient();

// Fetch all users
const getAllUsers: ApiRouteFunction = async () => {
  const users = await prisma.user.findMany();
  return buildSuccessResponse(users);
};

// Fetch the user for the specified id
const getSingleUser: ApiRouteFunction = async (params: { id: string }) => {
  const userId: number = parseInt(params.id);
  const requestedUser = await prisma.user.findUnique({ where: { userId: userId } });
  if (!requestedUser) {
    return buildNotFoundResponse('user', `#${params.id}`);
  }
  return buildSuccessResponse(requestedUser);
};

// Log the user in via their emailId
const logUserIn: ApiRouteFunction = async (_params, event) => {
  if (!event.body) {
    return buildClientFailureResponse('No user info found for login.');
  }
  const body = JSON.parse(event.body!);
  if (!body.id_token) {
    return buildClientFailureResponse('No id_token found for login.');
  }
  const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: body.id_token,
    audience: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error('Auth server response payload invalid');
  const userId = payload['sub']; // google user id

  // check if user is already in the database via Google ID
  let user = await prisma.user.findUnique({ where: { googleAuthId: userId } });

  // if not in database, create user in database
  if (user === null) {
    const emailId = payload['email']!.includes('@husky.neu.edu')
      ? payload['email']!.split('@')[0]
      : null;
    const createdUser = await prisma.user.create({
      data: {
        firstName: payload['given_name']!,
        lastName: payload['family_name']!,
        googleAuthId: userId,
        email: payload['email']!,
        emailId
      }
    });
    user = createdUser;
  }

  // register a login
  await prisma.session.create({
    data: {
      userId: user.userId,
      deviceInfo: event.headers['user-agent']
    }
  });

  return buildSuccessResponse(user);
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
