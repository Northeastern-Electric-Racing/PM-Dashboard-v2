/*
 * This file is part of NER's FinishLine by NERand licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient, Role } from '@prisma/client';
import { FromSchema } from 'json-schema-to-ts';
import {
  buildNoAuthResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  eventSchema,
  createActivationChangeRequestPayloadSchema
} from 'utils';

const prisma = new PrismaClient();

export const baseHandler: Handler<FromSchema<typeof inputSchema>> = async ({ body }, _context) => {
  // verify user is allowed to create activation change requests
  const user = await prisma.user.findUnique({ where: { userId: body.submitterId } });
  if (!user) return buildNotFoundResponse('user', `#${body.submitterId}`);
  if (user.role === Role.GUEST) return buildNoAuthResponse();

  // verify wbs element exists
  const wbsElement = await prisma.wBS_Element.findUnique({
    where: {
      wbsNumber: {
        carNumber: body.wbsNum.carNumber,
        projectNumber: body.wbsNum.projectNumber,
        workPackageNumber: body.wbsNum.workPackageNumber
      }
    }
  });
  if (wbsElement === null) return buildNotFoundResponse('wbs element', `${body.wbsNum}`);

  const createdChangeRequest = await prisma.change_Request.create({
    data: {
      submitter: { connect: { userId: body.submitterId } },
      wbsElement: { connect: { wbsElementId: wbsElement.wbsElementId } },
      type: body.type,
      activationChangeRequest: {
        create: {
          projectLead: { connect: { userId: body.projectLeadId } },
          projectManager: { connect: { userId: body.projectManagerId } },
          startDate: new Date(body.startDate),
          confirmDetails: body.confirmDetails
        }
      }
    }
  });

  return buildSuccessResponse({
    message: `Successfully created activation change request #${createdChangeRequest.crId}.`
  });
};

const inputSchema = eventSchema(createActivationChangeRequestPayloadSchema);

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
