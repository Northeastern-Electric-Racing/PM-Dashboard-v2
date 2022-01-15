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
import { buildClientFailureResponse, buildNotFoundResponse, buildSuccessResponse } from 'utils';

const prisma = new PrismaClient();

// gets highest current project number
const getHighestProjectNumber = async (carNumber: number) => {
  const maxProjectNumber = await prisma.wBS_Element.aggregate({
    where: {
      carNumber
    },
    max: {
      projectNumber: true,
    },
  });

  return maxProjectNumber.max.projectNumber;
}

// gets the associated change request for creating a project
const getChangeRequestReviewState = async (crId: number) => {
  const cr = await prisma.change_Request.findUnique({
    where: {
      crId
    }
  });

  // returns null if the change request doesn't exist
  // if it exists, return a boolean describing if the change request was reviewed
  return cr ? cr.dateReviewed !== null : cr;
}

export const baseHandler: Handler = async ({ body }, _context) => {
  // check if the change request exists
  const crReviewed = await getChangeRequestReviewState(body.crId);
  if (crReviewed === null) {
    return buildNotFoundResponse('change request', `CR #${body.crId}`);
  }

  // check if the change request for the project was reviewed
  if (!crReviewed) {
    return buildClientFailureResponse('Cannot implement an unreviewed change request');
  }

  // create the wbs element for the project and document the implemented change request
  const maxProjectNumber = await getHighestProjectNumber(body.carNumber);
  const createdProject = await prisma.wBS_Element.create({
    data: {
      carNumber: body.carNumber,
      projectNumber: maxProjectNumber + 1,
      workPackageNumber: 0,
      name: body.name,
      project: {
        create: {
          summary: body.summary,
        },
      },
      changes: {
        create: {
          changeRequestId: body.crId,
          implementerId: body.userId,
          detail: 'New Project Created',
        },
      },
    },
    include: {
      project: true,
      changes: true,
    },
  });

  return buildSuccessResponse(
    {
      wbsNumber: {
        car: createdProject.carNumber,
        project: createdProject.projectNumber,
        workPackage: createdProject.workPackageNumber,
      }
    }
  );
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        userId: { type: 'integer', minimum: 0 },
        crId: { type: 'integer', minimum: 0 },
        name: { type: 'string' },
        carNumber: { type: 'integer', minimum: 0 },
        summary: { type: 'string' }
      },
      required: ['userId', 'crId', 'name', 'carNumber', 'summary']
    }
  }
};

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
