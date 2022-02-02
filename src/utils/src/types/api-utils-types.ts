/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';

export type ApiRouteFunction = (
  params: any,
  event: HandlerEvent,
  context: HandlerContext
) => HandlerResponse | Promise<HandlerResponse>;

export interface ApiRoute {
  path: string;
  httpMethod: string;
  func: ApiRouteFunction;
}

export const eventSchema = <Body extends Record<string, any>>(
  bodySchema: Body,
  methods?: string[]
) =>
  ({
    type: 'object',
    properties: {
      httpMethod: {
        type: 'string',
        enum: methods
      },
      body: bodySchema,
      headers: {
        type: 'object',
        properties: {
          'user-agent': { type: 'string' }
          // Cookie: { type: 'string' }
        },
        required: ['user-agent']
      }
    },
    required: ['body', 'headers', 'httpMethod']
  } as const);

export const bodySchema = <Props extends Record<string, any>>(
  properties: Props,
  optionalProps: (keyof Props)[] = [],
  additionalProperties = false
) =>
  ({
    type: 'object',
    properties,
    required: Object.keys(properties).filter((key: keyof Props) => !optionalProps.includes(key)),
    additionalProperties
  } as const);

export const intType = { type: 'integer', minimum: 0 } as const;
export const stringType = { type: 'string' } as const;
export const dateType = { type: 'string', format: 'date' } as const;
