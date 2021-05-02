/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import { match } from 'path-to-regexp';
import { API_URL } from './api-routes';
import { ApiRoute } from './types/api-utils-types';

/** Builds a standard API response object */
export const buildResponseObject: (
  statusCode: number,
  body: Object,
  headers?: {
    [header: string]: boolean | number | string;
  }
) => HandlerResponse = (statusCode, body, headers) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
};

/** Finds the matching route and executes the route's function */
export const routeMatcher: (
  routes: ApiRoute[],
  event: HandlerEvent,
  context: HandlerContext
) => HandlerResponse = (routes, event, context) => {
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
