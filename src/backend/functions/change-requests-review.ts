/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';
import {
  buildNotFoundResponse,
  buildSuccessResponse,
  reviewChangeRequestPayloadSchema
} from 'utils';

const prisma = new PrismaClient();

// handle reviewing of change requests
export const reviewChangeRequest: Handler = async ({ body }, _context) => {
  // TODO: validate authorization
  const { crId, reviewNotes, accepted } = body;

  // ensure existence of change request
  const foundCR = prisma.change_Request.findUnique({ where: { crId } });
  if (!foundCR) return buildNotFoundResponse('change request', `#${crId}`);

  // update change request
  const update = await prisma.change_Request.update({
    where: { crId },
    data: { reviewNotes, accepted, dateReviewed: new Date() }
  });

  // TODO: consider transformer or other possible return body
  return buildSuccessResponse({ message: `Change request #${update.crId} successfully reviewed.` });
};

// expected structure of json body
const inputSchema = {
  type: 'object',
  properties: {
    body: reviewChangeRequestPayloadSchema
  },
  required: ['body']
};

const handler = middy(reviewChangeRequest)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
