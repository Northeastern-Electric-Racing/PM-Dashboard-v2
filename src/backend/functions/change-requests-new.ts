/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient, CR_Type, Scope_CR_Why_Type } from '@prisma/client';
import { FromSchema } from 'json-schema-to-ts';
import {
  bodySchema,
  booleanType,
  buildClientFailureResponse,
  buildSuccessResponse,
  dateType,
  enumType,
  eventSchema,
  intType,
  stringType,
  arrayType
} from 'utils';

const prisma = new PrismaClient();

// Create a new standard scope change request
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
  // TODO: check if this is the best thing to return
  return buildSuccessResponse(createdChangeRequest);
};

// Create a new activation change request
const createActivationChangeRequest = async (
  submitterId: number,
  wbsElementId: number,
  type: CR_Type,
  body: {
    projectLeadId: number;
    projectManagerId: number;
    startDate: Date;
    confirmDetails: boolean;
  }
) => {
  const createdChangeRequest = await prisma.change_Request.create({
    data: {
      submitter: { connect: { userId: submitterId } },
      wbsElement: { connect: { wbsElementId } },
      type,
      activationChangeRequest: {
        create: {
          projectLead: { connect: { userId: body.projectLeadId } },
          projectManager: { connect: { userId: body.projectManagerId } },
          startDate: body.startDate,
          confirmDetails: body.confirmDetails
        }
      }
    }
  });
  // TODO: check if this is the best thing to return
  return buildSuccessResponse(createdChangeRequest);
};

// Create a new stage gate change request
const createStageGateChangeRequest = async (
  submitterId: number,
  wbsElementId: number,
  type: CR_Type,
  body: {
    leftoverBudget: number;
    confirmDone: boolean;
  }
) => {
  const createdChangeRequest = await prisma.change_Request.create({
    data: {
      submitter: { connect: { userId: submitterId } },
      wbsElement: { connect: { wbsElementId } },
      type,
      stageGateChangeRequest: {
        create: {
          leftoverBudget: body.leftoverBudget,
          confirmDone: body.confirmDone
        }
      }
    }
  });
  // TODO: check if this is the best thing to return
  return buildSuccessResponse(createdChangeRequest);
};

// Create proper type of new change request
export const baseHandler: Handler<FromSchema<typeof inputSchema>> = async ({ body }, _context) => {
  const { submitterId, wbsElementId, type } = body;
  if (type === CR_Type.DEFINITION_CHANGE || type === CR_Type.ISSUE || type === CR_Type.OTHER) {
    return createStandardChangeRequest(
      submitterId,
      wbsElementId,
      type,
      body as FromSchema<typeof standardSchema>
    );
  }
  if (type === CR_Type.ACTIVATION) {
    // TODO: is there a better way to convert this date string?
    // I couldn't seem to figure out if middy can handle this, but this 1 additional line isn't the worst
    body = body as FromSchema<typeof activationSchema>;
    return createActivationChangeRequest(submitterId, wbsElementId, type, {
      ...body,
      startDate: new Date(body.startDate)
    });
  }
  if (type === CR_Type.STAGE_GATE) {
    return createStageGateChangeRequest(
      submitterId,
      wbsElementId,
      type,
      body as FromSchema<typeof stageGateSchema>
    );
  }
  // TODO: change this return statement
  return buildClientFailureResponse('CR type not supported');
};

// standard / scope change request fields
const standardSchema = bodySchema({
  type: enumType(CR_Type.OTHER, CR_Type.ISSUE, CR_Type.DEFINITION_CHANGE),
  submitterId: intType,
  wbsElementId: intType,
  what: stringType,
  scopeImpact: stringType,
  timelineImpact: intType,
  budgetImpact: intType,
  why: arrayType(
    bodySchema({
      explain: stringType,
      type: enumType(
        Scope_CR_Why_Type.ESTIMATION,
        Scope_CR_Why_Type.MANUFACTURING,
        Scope_CR_Why_Type.OTHER,
        Scope_CR_Why_Type.OTHER_PROJECT,
        Scope_CR_Why_Type.RULES,
        Scope_CR_Why_Type.DESIGN,
        Scope_CR_Why_Type.SCHOOL
      )
    }),
    1 // min 1 item
  )
});

// activation change request fields
const activationSchema = bodySchema({
  type: enumType(CR_Type.ACTIVATION),
  submitterId: intType,
  wbsElementId: intType,
  projectLeadId: intType,
  projectManagerId: intType,
  startDate: dateType,
  confirmDetails: booleanType
});

// stage gate change request fields
const stageGateSchema = bodySchema({
  type: enumType(CR_Type.STAGE_GATE),
  submitterId: intType,
  wbsElementId: intType,
  leftoverBudget: intType,
  confirmDone: booleanType
});

// validates the event parameter, so body must be explicitly stated
// TODO: consider moving schemas (or parts of schemas) to utils package? consider using schema-to-ts?
const inputSchema = eventSchema({
  oneOf: [standardSchema, activationSchema, stageGateSchema]
} as const);

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
