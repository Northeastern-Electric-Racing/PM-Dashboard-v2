/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Context } from 'aws-lambda';
import { match } from 'path-to-regexp';
import { API_URL } from './api-routes';
import { ApiRoute } from './types/api-utils-types';

// Finds the matching route and executes the route's function
export const routeMatcher: Function = (routes: ApiRoute[], event: any, context: Context) => {
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
    body: { message: `Could not find a route matching the requested path [${event.path}].` }
  };
};
