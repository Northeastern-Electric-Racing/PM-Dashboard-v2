/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Context } from 'aws-lambda';
import { match } from 'path-to-regexp';
import { ApiRoute } from './types/api-utils-types';

// Finds the matching route and executes the route's function
export const routeMatcher: Function = (routes: ApiRoute[], event: any, context: Context) => {
  for (let index = 0; index < routes.length; index += 1) {
    const singleRoute: ApiRoute = routes[index];
    const matchResults: { params: Object } | false = match(singleRoute.path)(event.path);
    if (matchResults && event.httpMethod === singleRoute.httpMethod) {
      return singleRoute.func(matchResults.params, event, context);
    }
  }
  return { statusCode: 404, body: 'Could not find a matching route for the request.' };
};
