/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { match } from 'path-to-regexp';
import { API_URL } from './api-routes';
import { ApiRoute } from './types/api-utils-types';
import jwt from 'jsonwebtoken';
require('dotenv').config();

/**
 * Builds a standard API response object
 */
export const buildResponse = (
  statusCode: number,
  body: Object,
  headers?: {
    [header: string]: boolean | number | string;
  }
): HandlerResponse => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
};

/**
 * Builds a success API response object
 */
export const buildSuccessResponse = (body: Object) => {
  return buildResponse(200, body);
};

/**
 * Builds a failure API response object
 */
export const buildFailureResponse = (status: number, message: string) => {
  return buildResponse(status, { message });
};

/**
 * Builds a client error failure API response object
 * @param message Error message
 */
export const buildClientFailureResponse = (message: string) => {
  return buildFailureResponse(400, `Client error: ${message}`);
};

/**
 * Builds a server error failure API response object
 * @param message Error message
 */
export const buildServerFailureResponse = (message: string) => {
  return buildFailureResponse(500, `Server error: ${message}`);
};

/**
 * Builds an error failure API response object for when the request lacks authentication
 */
export const buildNoAuthResponse = () => {
  return buildFailureResponse(401, 'Authentication is required to perform the request.');
};

/**
 * Builds an error failure API response object for when the requesting user
 * lacks sufficient permission to perform the request.
 */
export const buildNotPermittedResponse = () => {
  return buildFailureResponse(403, 'User has insufficient permissions to perform the request.');
};

/**
 * Builds a not found error API response object
 * @param type The type of item requested
 * @param item The requested item which could not be found
 */
export const buildNotFoundResponse = (type: string, item: string) => {
  return buildFailureResponse(404, `Could not find the requested ${type} [${item}].`);
};

// ---------------------------------

/**
 * Finds the matching route and executes the route's function
 */
export const routeMatcher = (
  routes: ApiRoute[],
  event: HandlerEvent,
  context: HandlerContext
): HandlerResponse | Promise<HandlerResponse> => {
  for (let index = 0; index < routes.length; index += 1) {
    const singleRoute: ApiRoute = routes[index];
    const requestPath: string = !event.path.startsWith(API_URL) ? API_URL + event.path : event.path;
    const matchResults: { params: Object } | false = match(singleRoute.path)(requestPath);
    if (matchResults && event.httpMethod === singleRoute.httpMethod) {
      return singleRoute.func(matchResults.params, event, context);
    }
  }
  return buildNotFoundResponse("route", event.path);
};

/**
* Verifys a token and returns the payload/user if successful.
* @param token The jwt token
*/
export const verifyToken = (
  token: any,
) => {
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (decoded) {
      return decoded;
    } else {
      console.log(err);
    }
  });
}
