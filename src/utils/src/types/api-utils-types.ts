/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';

export type ApiRouteFunction = (
  params: any,
  event: HandlerEvent,
  context: HandlerContext
) => HandlerResponse;

export interface ApiRoute {
  path: string;
  httpMethod: string;
  func: ApiRouteFunction;
}
