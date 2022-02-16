/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient, WBS_Element } from '@prisma/client';
import { FromSchema } from 'json-schema-to-ts';
import { buildSuccessResponse, eventSchema, workPackageCreateInputSchemaBody } from 'utils';

const prisma = new PrismaClient();

export const createWorkPackage: Handler<FromSchema<typeof inputSchema>> = async (
  { body },
  _context
) => {
  const {
    projectWbsNum,
    name,
    crId,
    userId,
    startDate,
    duration,
    dependencies,
    expectedActivities,
    deliverables
  } = body;
  // get the corresponding project so we can find the next wbs number
  // and what number work package this should be
  const { carNumber, projectNumber, workPackageNumber } = projectWbsNum;
  console.log('wbs find unique');
  const wbsElem = await prisma.wBS_Element.findUnique({
    where: {
      wbsNumber: {
        carNumber,
        projectNumber,
        workPackageNumber
      }
    }
  });

  if (wbsElem === null) throw new TypeError('No corresponding WBS Element for WBS Number.');
  console.log('project find unique');
  console.log(`wbsElemId: ${wbsElem.wbsElementId}`);
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
  const { projectId } = project;

  const newWorkPackageNumber: number =
    project.workPackages
      .map((element) => element.wbsElement.workPackageNumber)
      .reduce((prev, curr) => Math.max(prev, curr), 0) + 1;

  const dependenciesWBSElems = await Promise.all(
    dependencies.map(async (ele) => {
      return await prisma.wBS_Element.findUnique({
        where: {
          wbsNumber: {
            carNumber: ele.carNumber,
            projectNumber: ele.projectNumber,
            workPackageNumber: ele.workPackageNumber
          }
        }
      });
    })).then(res => res).catch(err => { throw err }) as WBS_Element[];

  const dependenciesIds = dependenciesWBSElems.map(ele => ele.wbsElementId);

  console.log('creating');
  // add to the database
  const created = await prisma.work_Package.create({
    data: {
      wbsElement: {
        create: {
          carNumber,
          projectNumber,
          workPackageNumber: newWorkPackageNumber,
          name,
          changes: {
            create: {
              changeRequestId: crId,
              implementerId: userId,
              detail: 'New Work Package Created'
            }
          }
        }
      },
      project: { connect: { projectId } },
      startDate: new Date(startDate),
      duration,
      orderInProject: project.workPackages.length + 1,
      dependencies: { connect: dependenciesIds.map((ele) => ({ wbsElementId: ele })) },
      expectedActivities: { create: expectedActivities.map((ele) => ({ detail: ele })) },
      deliverables: { create: deliverables.map((ele) => ({ detail: ele })) }
    }
  });

  console.log('done');
  return buildSuccessResponse(created);
};

// expected structure of json body
const inputSchema = eventSchema(workPackageCreateInputSchemaBody);

const handler = middy(createWorkPackage)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
