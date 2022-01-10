/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { Prisma, PrismaClient } from '@prisma/client';
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
  routeMatcher,
  User
} from 'utils';
require('dotenv').config();

import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const usersTransformer = (user: Prisma.UserGetPayload<null>): User => {
  if (user === null) throw new TypeError('User not found');

  return {
    ...user,
    userId: user.userId ?? undefined,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    googleAuthId: user.googleAuthId ?? undefined,
    email: user.email ?? undefined,
    emailId: user.emailId,
    role: user.role ?? undefined
  };
};

// Fetch all users
const getAllUsers: ApiRouteFunction = async () => {
  const users = await prisma.user.findMany();
  return buildSuccessResponse(users.map(usersTransformer));
};

// Fetch the user for the specified id
const getSingleUser: ApiRouteFunction = async (params: { id: string }) => {
  const userId: number = parseInt(params.id);
  const requestedUser = await prisma.user.findUnique({ where: { userId } });
  if (!requestedUser) {
    return buildNotFoundResponse('user', `#${params.id}`);
  }
  return buildSuccessResponse(usersTransformer(requestedUser));
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
<<<<<<< Updated upstream
  const { sub: userId } = payload; // google user id
=======
  const userid = payload['sub']; // google user id
  console.log(userid);
>>>>>>> Stashed changes
  // check if user is already in the database via Google ID
  let user = await prisma.user.findUnique({ where: { googleAuthId: userId } });

<<<<<<< Updated upstream
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

  return buildSuccessResponse(usersTransformer(user));
=======
  const createdUser: User = {
    id: 1,
    firstName: payload['given_name']!,
    lastName: payload['family_name']!,
    emailId: payload['email']!,
    firstLogin: new Date(),
    lastLogin: new Date(),
    role: Role.Guest
  };
  const accessToken = jwt.sign(createdUser, process.env.JWT_SECRET, { expiresIn: '20mins' });
  // const userToLogIn: User | undefined = exampleAllUsers.find(
  //   (usr: User) => usr.emailId === body.emailId
  // );
  // if (userToLogIn === undefined) {
  //   return buildNotFoundResponse('user', `${body.emailId}`);
  // }
  return { ...buildSuccessResponse(createdUser), accessToken: accessToken };
>>>>>>> Stashed changes
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
  } catch (error: any) {
    console.error(error);
    return buildServerFailureResponse(error.message);
  }
};

export { handler };
