/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient, Role } from '@prisma/client';
import {
  buildNoAuthResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  eventSchema,
  riskEditInputSchemaBody
} from 'utils';
import { FromSchema } from 'json-schema-to-ts';

const prisma = new PrismaClient(); 

export const editRisk: Handler<FromSchema<typeof inputSchema>> = async (
	{ body },
	_context
) => {
	const {
		userId,
		id, 
		detail, 
		resolved
	} = body; 
	
	// verify user is allowed to edit work packages
	const user = await prisma.user.findUnique({ where: { userId } });
	if (!user) return buildNotFoundResponse('user', `#${userId}`);
	if (user.role === Role.GUEST) return buildNoAuthResponse();

	// get the original risk and check if it exists
	const originalRisk = await prisma.risk.findUnique({
		where: { id },
	});
	if (originalRisk === null) {
		return buildNotFoundResponse('Risk', `#${id}`);
	}

	// update the risk with the input fields
	const updatedRisk = await prisma.risk.update({
		where: { 
			id
		},
		data: {
			detail,
			isResolved: resolved
		}
	});

	// return the updated risk 
	return buildSuccessResponse(updatedRisk); 
}

/**
 * 	HELPER METHODS:
 */

// expected structure of json body
const inputSchema = eventSchema(riskEditInputSchemaBody);

const handler = middy(editRisk)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };


