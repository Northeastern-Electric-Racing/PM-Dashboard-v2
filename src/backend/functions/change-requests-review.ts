/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient, Role } from '@prisma/client';
import type { FromSchema } from 'json-schema-to-ts';
import {
  buildNoAuthResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  eventSchema,
  reviewChangeRequestPayloadSchema
} from 'utils';

const prisma = new PrismaClient();

// handle reviewing of change requests
export const reviewChangeRequest: Handler<FromSchema<typeof inputSchema>> = async (
  { body },
  _context
) => {
  const { reviewerId, crId, reviewNotes, accepted } = body;

  // verify that the user is allowed review change requests
  const reviewer = await prisma.user.findUnique({ where: { userId: reviewerId } });
  if (!reviewer) return buildNotFoundResponse('User', `#${reviewerId}`);
  if (reviewer.role === Role.GUEST || reviewer.role === Role.MEMBER) return buildNoAuthResponse();

  // ensure existence of change request
  const foundCR = await prisma.change_Request.findUnique({ where: { crId } });
  if (!foundCR) return buildNotFoundResponse('change request', `#${crId}`);

  // verify that the user is not reviewing their own change request
  if (reviewerId === foundCR.submitterId) return buildNoAuthResponse();

  // update change request
  const update = await prisma.change_Request.update({
    where: { crId },
    data: {
      reviewer: { connect: { userId: reviewerId } },
      reviewNotes,
      accepted,
      dateReviewed: new Date()
    }
  });

  // TODO: handle errors
  return buildSuccessResponse({ message: `Change request #${update.crId} successfully reviewed.` });
};

// expected structure of json body
const inputSchema = eventSchema(reviewChangeRequestPayloadSchema);

const handler = middy(reviewChangeRequest)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
