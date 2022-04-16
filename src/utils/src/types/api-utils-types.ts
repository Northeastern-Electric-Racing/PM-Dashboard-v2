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

export const intType = { type: 'integer' } as const; // please just leave out min so it works for now, everything is just so scuffed
export const stringType = { type: 'string' } as const;
export const dateType = { type: 'string', format: 'date' } as const;
export const booleanType = { type: 'boolean' } as const;

/**
 * Create a basic array schema type
 * @param itemType - The schema type of the elements
 * @param minItems - The minimum number of items in the array
 */
export const arrayType = <Item>(itemType: Item, minItems: number = 0) =>
  ({ type: 'array', items: itemType, minItems, uniqueItems: true } as const);

/**
 * Create an enum schema type
 * provide as arguments all the possible enum values
 */
export const enumType = <Items extends Readonly<string[]>>(...items: Items) =>
  ({ enum: items } as const);

/**
 * Help create the schema for the event body, used for middy validation
 * @param bodySchema - The schema describing the body, likely from the bodySchema function
 */
export const eventSchema = <Body extends Record<string, any>>(bodySchema: Body) =>
  ({
    type: 'object',
    properties: {
      body: bodySchema,
      headers: {
        type: 'object',
        properties: {
          'user-agent': stringType
          // Cookie: stringType
        },
        required: ['user-agent']
      }
    },
    required: ['body', 'headers']
  } as const);

/**
 * Help create the schema for a middy request body or object within the body
 * @param properties - The object with the property names as keys and schema types as values
 * @param optionalProps - An array of properties that should be marked as optional
 * @param additionalProperties - If true, allows addtional properties not specified by the schema
 */
export const bodySchema = <
  Props extends Record<string, any>,
  Opts extends keyof Props = never,
  Add extends boolean = false
>(
  properties: Props,
  optionalProps: Opts[] = [],
  additionalProperties?: Add
) =>
  ({
    type: 'object',
    properties,
    required: Object.keys(properties).filter(
      (key: keyof Props) => !(optionalProps as (keyof Props)[]).includes(key)
    ) as Exclude<keyof Props, Opts>[],
    additionalProperties: !!additionalProperties as Add
  } as const);

export const wbsNumType = bodySchema({
  carNumber: intType,
  projectNumber: intType,
  workPackageNumber: intType
});
