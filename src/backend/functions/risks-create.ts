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
import { FromSchema } from 'json-schema-to-ts';
import {
  buildNotFoundResponse,
  buildSuccessResponse,
  eventSchema,
  riskCreateInputSchemaBody
} from 'utils';

const prisma = new PrismaClient();

// Create new risk
const createRisk: Handler<FromSchema<typeof inputSchema>> = async ({ body }, _context) => {
  const { projectId, detail, createdById } = body;

  const targetProj = await prisma.project.findUnique({ where: { projectId } });

  const targetUser = await prisma.user.findUnique({ where: { userId: createdById } });

  if (!targetProj) {
    return buildNotFoundResponse('project', `ID # ${projectId}`);
  }

  if (!targetUser) {
    return buildNotFoundResponse('user', `ID # ${createdById}`);
  }

  const createdRisk = await prisma.risk.create({
    data: {
      project: { connect: { projectId } },
      detail,
      createdBy: { connect: { userId: createdById } }
    }
  });

  return buildSuccessResponse({
    message: `Successfully created risk #${createdRisk.id}.`
  });
};

const inputSchema = eventSchema(riskCreateInputSchemaBody);

const handler = middy(createRisk)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
