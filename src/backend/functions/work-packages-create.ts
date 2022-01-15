/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient, WBS_Element_Status } from '@prisma/client';
import { buildSuccessResponse } from 'utils';

const prisma = new PrismaClient();

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
      workPackages: { include: { wbsElement: true, dependencies: true } }
    }
  });

  if (project === null) throw new TypeError('Project Id not found!');

  // eslint-disable-next-line prefer-destructuring
  const { carNumber, projectNumber, workPackageNumber } = project.workPackages[
    project.workPackages.length - 1
  ].wbsElement;

  // add to the database
  const created = await prisma.work_Package.create({
    data: {
      wbsElement: {
        create: {
          carNumber,
          projectNumber,
          workPackageNumber: workPackageNumber + 1,
          name: body.name,
          status: WBS_Element_Status.ACTIVE
        }
      },
      project: {
        connect: {
          projectId: body.projectId
        }
      },
      startDate: new Date(body.startDate),
      duration: body.duration,
      orderInProject: project.workPackages.length,
      dependencies: {
        connect: body.wbsElementIds.map((ele: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          wbsElementId: ele;
        })
      },
      expectedActivities: {
        create: body.expectedActivities.map((x: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          detail: x;
        })
      },
      deliverables: {
        create: body.deliverables.map((x: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          detail: x;
        })
      }
    }
  });

  return buildSuccessResponse(created);
};

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        userId: { type: 'number', minimum: 0 },
        name: { type: 'string' },
        projectId: { type: 'number', minimum: 0 },
        startDate: { type: 'string', format: 'date' },
        duration: { type: 'number', minimum: 0 },
        wbsElementIds: {
          type: 'array',
          items: {
            type: 'number'
          }
        },
        expectedActivities: {
          type: 'array',
          items: {
            type: 'number'
          }
        },
        deliverables: {
          type: 'array',
          items: {
            type: 'number'
          }
        }
      },
      required: [
        'userId',
        'name',
        'projectId',
        'startDate',
        'duration',
        'wbsElementIds',
        'expectedActivities',
        'deliverables'
      ]
    }
  }
};

const handler = middy(createWorkPackage)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
