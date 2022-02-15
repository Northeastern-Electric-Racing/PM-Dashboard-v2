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
import { buildSuccessResponse, workPackageCreateInputSchemaBody } from 'utils';

const prisma = new PrismaClient();

export const createWorkPackage: Handler = async ({ body }, _context) => {
  // get the corresponding project so we can find the next wbs number
  // and what number work package this should be
  const { carNumber, projectNumber, workPackageNumber } = body.projectWbsNum;
  console.log('wbs find unique');
  const wbsElem = await prisma.wBS_Element.findUnique({
    where: {
      wbsNumber: {
        carNumber: carNumber,
        projectNumber: projectNumber,
        workPackageNumber: workPackageNumber
      }
    }
  });

  if (wbsElem === null) throw new TypeError('No corresponding WBS Element for WBS Number.');
  console.log('project find unique');
  const project = await prisma.project.findUnique({
    where: {
      wbsElementId: wbsElem!.wbsElementId
      // use single project as reference for breaking down wbsnum
    },
    include: {
      wbsElement: true,
      workPackages: { include: { wbsElement: true, dependencies: true } }
    }
  });

  if (project === null) throw new TypeError('Project Id not found!');

  console.log('creating');
  // add to the database
  const created = await prisma.work_Package.create({
    data: {
      wbsElement: {
        create: {
          carNumber,
          projectNumber,
          workPackageNumber: workPackageNumber + 1,
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

  console.log('done');
  return buildSuccessResponse(created);
};

// expected structure of json body
const inputSchema = {
  type: 'object',
  properties: {
    body: workPackageCreateInputSchemaBody
  }
};

const handler = middy(createWorkPackage)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
