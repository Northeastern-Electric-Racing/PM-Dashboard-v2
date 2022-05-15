/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient, CR_Type } from '@prisma/client';
import {
  buildClientFailureResponse,
  buildSuccessResponse,
  newChangeRequestPayloadSchema,
  NewStandardChangeRequestPayload,
  NewActivationChangeRequestPayload,
  NewStageRequestChangeRequestPayload
} from 'utils';
import { ChangeRequestType } from 'utils';

const prisma = new PrismaClient();

// Create a new standard scope change request
const createStandardChangeRequest = async (
  submitterId: number,
  wbsElementId: number,
  type: ChangeRequestType,
  payload: NewStandardChangeRequestPayload
) => {
  const createdChangeRequest = await prisma.change_Request.create({
    data: {
      submitter: { connect: { userId: submitterId } },
      wbsElement: { connect: { wbsElementId } },
      type,
      scopeChangeRequest: {
        create: {
          what: payload.what,
          scopeImpact: payload.scopeImpact,
          timelineImpact: payload.timelineImpact,
          budgetImpact: payload.budgetImpact,
          why: { createMany: { data: payload.why } }
        }
      }
    }
  });
  // TODO: check if this is the best thing to return
  return buildSuccessResponse({
    message: `Change request #${createdChangeRequest.crId} successfully created.`,
    crId: createdChangeRequest.crId
  });
};

// Create a new activation change request
const createActivationChangeRequest = async (
  submitterId: number,
  wbsElementId: number,
  type: CR_Type,
  payload: NewActivationChangeRequestPayload
) => {
  const createdChangeRequest = await prisma.change_Request.create({
    data: {
      submitter: { connect: { userId: submitterId } },
      wbsElement: { connect: { wbsElementId } },
      type,
      activationChangeRequest: {
        create: {
          projectLead: { connect: { userId: payload.projectLeadId } },
          projectManager: { connect: { userId: payload.projectManagerId } },
          startDate: payload.startDate,
          confirmDetails: payload.confirmDetails
        }
      }
    }
  });
  // TODO: check if this is the best thing to return
  return buildSuccessResponse({
    message: `Change request #${createdChangeRequest.crId} successfully created.`,
    crId: createdChangeRequest.crId
  });
};

// Create a new stage gate change request
const createStageGateChangeRequest = async (
  submitterId: number,
  wbsElementId: number,
  type: CR_Type,
  payload: NewStageRequestChangeRequestPayload
) => {
  const createdChangeRequest = await prisma.change_Request.create({
    data: {
      submitter: { connect: { userId: submitterId } },
      wbsElement: { connect: { wbsElementId } },
      type,
      stageGateChangeRequest: {
        create: {
          leftoverBudget: payload.leftoverBudget,
          confirmDone: payload.confirmDone
        }
      }
    }
  });
  // TODO: check if this is the best thing to return
  return buildSuccessResponse({
    message: `Change request #${createdChangeRequest.crId} successfully created.`,
    crId: createdChangeRequest.crId
  });
};

// Create proper type of new change request
export const baseHandler: Handler = async ({ body }, _context) => {
  const { submitterId, wbsElementId, type, payload } = body;

  if (type === CR_Type.DEFINITION_CHANGE || type === CR_Type.ISSUE || type === CR_Type.OTHER) {
    return createStandardChangeRequest(submitterId, wbsElementId, type, payload);
  } else if (type === CR_Type.ACTIVATION) {
    // TODO: is there a better way to convert this date string?
    // I couldn't seem to figure out if middy can handle this, but this 1 additional line isn't the worst
    body.startDate = new Date(body.startDate);
    return createActivationChangeRequest(submitterId, wbsElementId, type, payload);
  } else if (type === CR_Type.STAGE_GATE) {
    return createStageGateChangeRequest(submitterId, wbsElementId, type, payload);
  }
  // TODO: change this return statement
  return buildClientFailureResponse('CR type not supported');
};

// validates the event parameter, so body must be explicitly stated
// TODO: consider moving schemas (or parts of schemas) to utils package? consider using schema-to-ts?
const inputSchema = {
  type: 'object',
  properties: {
    body: newChangeRequestPayloadSchema
  }
};

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
