/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { match } from 'path-to-regexp';
import { API_URL } from './api-routes';
import { ApiRoute } from './types/api-utils-types';

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
 * Builds a server error failure API response object
 * @param message Error message
 */
export const buildServerFailureResponse = (message: string): HandlerResponse => {
  return buildResponse(500, { message });
};

/**
 * Builds a not found error API response object
 * @param type The type of item requested
 * @param item The requested item which could not be found
 */
export const buildNotFoundResponse = (type: string, item: string): HandlerResponse => {
  return buildResponse(404, { message: `Could not find the requested ${type} [${item}].` });
};

/**
 * Builds a success API response object
 */
export const buildSuccessResponse = (body: Object): HandlerResponse => {
  return buildResponse(200, body);
};

/**
 * Finds the matching route and executes the route's function
 */
export const routeMatcher = (
  routes: ApiRoute[],
  event: HandlerEvent,
  context: HandlerContext
): HandlerResponse => {
  for (let index = 0; index < routes.length; index += 1) {
    const singleRoute: ApiRoute = routes[index];
    const requestPath: string = !event.path.startsWith(API_URL) ? API_URL + event.path : event.path;
    const matchResults: { params: Object } | false = match(singleRoute.path)(requestPath);
    if (matchResults && event.httpMethod === singleRoute.httpMethod) {
      return singleRoute.func(matchResults.params, event, context);
    }
  }
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: `Could not find a route matching the requested path [${event.path}].`
    })
  };
};
