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
import { buildSuccessResponse, workPackageInputSchemaBody } from 'utils';

const prisma = new PrismaClient();

// get the current highest work package number for the given project
const getHighestWorkPackageNumber = async (projectNumber: number) => {
  const maxWorkPackageNumber = await prisma.wBS_Element.aggregate({
    where: {
      projectNumber
    },
    max: {
      workPackageNumber: true
    }
  });

  return maxWorkPackageNumber.max.workPackageNumber;
};

export const createWorkPackage: Handler = async ({ body }, _context) => {
  // get the corresponding project so we can find the next wbs number
  // and what number work package this should be
  const project = await prisma.project.findUnique({
    where: {
      projectId: body.projectId
    },
    include: {
      goals: true,
      features: true,
      otherConstraints: true,
      wbsElement: true,
      workPackages: { include: { wbsElement: true, dependencies: true } }
    }
  });

  if (project === null) throw new TypeError('Project Id not found!');

  // eslint-disable-next-line prefer-destructuring
  const { carNumber, projectNumber } = project.wbsElement;

  const workPackageNumber =
    project.workPackages === undefined || project.workPackages.length === 0
      ? 1
      : (await getHighestWorkPackageNumber(projectNumber)) + 1;

  // add to the database
  const created = await prisma.work_Package.create({
    data: {
      wbsElement: {
        create: {
          carNumber,
          projectNumber,
          workPackageNumber,
          name: body.name,
          changes: {
            create: {
              changeRequestId: body.crId,
              implementerId: body.userId,
              detail: 'New Work Package Created'
            }
          }
        }
      },
      project: {
        connect: {
          projectId: body.projectId
        }
      },
      startDate: new Date(body.startDate),
      duration: body.duration,
      orderInProject: project.workPackages.length + 1,
      dependencies: {
        connect: body.wbsElementIds.map((ele: any) => {
          return { wbsElementId: ele };
        })
      },
      expectedActivities: {
        create: body.expectedActivities.map((ele: any) => {
          return { detail: ele };
        })
      },
      deliverables: {
        create: body.deliverables.map((ele: any) => {
          return { detail: ele };
        })
      }
    }
  });

  return buildSuccessResponse(created);
};

// expected structure of json body
const inputSchema = {
  type: 'object',
  properties: {
    body: workPackageInputSchemaBody
  }
};

const handler = middy(createWorkPackage)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
