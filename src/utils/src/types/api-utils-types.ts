/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Context } from 'aws-lambda';

export type ApiRouteFunction = (params: any, event: any, context: Context) => {};

export interface ApiRoute {
  path: string;
  httpMethod: string;
  func: ApiRouteFunction;
}
