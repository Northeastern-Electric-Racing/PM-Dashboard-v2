/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
// import { Handler as NetlifyHandler } from '@netlify/functions'; // TODO: types from netlify vs aws?
import { Handler } from 'aws-lambda';
import { PrismaClient, CR_Type, Scope_CR_Why_Type } from '@prisma/client';
import { buildClientFailureResponse, buildSuccessResponse } from 'utils';
// TODO: clean up imports

const prisma = new PrismaClient();

// TODO: add a comment to explain the function?
const createStandardChangeRequest = async (
  submitterId: number,
  wbsElementId: number,
  type: CR_Type,
  body: {
    what: string;
    scopeImpact: string;
    timelineImpact: number;
    budgetImpact: number;
    why: { explain: string; type: Scope_CR_Why_Type }[];
  }
) => {
  const createdChangeRequest = await prisma.change_Request.create({
    data: {
      submitter: { connect: { userId: submitterId } },
      wbsElement: { connect: { wbsElementId } },
      type,
      scopeChangeRequest: {
        create: {
          what: body.what,
          scopeImpact: body.scopeImpact,
          timelineImpact: body.timelineImpact,
          budgetImpact: body.budgetImpact,
          why: { createMany: { data: body.why } }
        }
      }
    }
  });
  // TODO: figure out what is best to return
  return buildSuccessResponse(createdChangeRequest);
};

// TODO: add a comment to explain the function?
const baseHandler: Handler = async ({ body }, _context) => {
  const { submitterId, wbsElementId, type } = body;
  if (type === CR_Type.DEFINITION_CHANGE || type === CR_Type.ISSUE || type === CR_Type.OTHER) {
    return createStandardChangeRequest(submitterId, wbsElementId, type, body);
  }
  if (type === CR_Type.ACTIVATION) {
    // TODO: create the function
  }
  if (type === CR_Type.STAGE_GATE) {
    // TODO: create the function
  }
  // TODO: change this return statement
  return buildClientFailureResponse('CR type not supported');
};

// validates the event parameter, so body must be explicitly stated
// TODO: actually complete the schema
// TODO: consider moving schemas (or parts of schemas) to utils package? consider using schema-to-ts?
const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        submitterId: { type: 'integer', minimum: 0 },
        wbsElementId: { type: 'integer', minimum: 0 },
        type: { enum: [CR_Type.ACTIVATION, CR_Type.OTHER] }
      },
      required: ['submitterId', 'wbsElementId', 'type']
    }
  }
};

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
