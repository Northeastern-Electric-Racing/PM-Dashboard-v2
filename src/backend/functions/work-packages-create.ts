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
  buildClientFailureResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  eventSchema,
  workPackageCreateInputSchemaBody
} from 'utils';

const prisma = new PrismaClient();

// gets the associated change request for creating a work package.
const getChangeRequestReviewState = async (crId: number) => {
  const cr = await prisma.change_Request.findUnique({ where: { crId } });

  // returns null if the change request doesn't exist
  // if it exists, return a boolean describing if the change request was reviewed
  return cr ? cr.dateReviewed !== null : cr;
};

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

  const crReviewed = await getChangeRequestReviewState(crId);
  if (crReviewed === null) return buildNotFoundResponse('change request', `CR #${crId}`);
  if (!crReviewed) {
    return buildClientFailureResponse('Cannot implement an unreviewed change request');
  }

  // get the corresponding project so we can find the next wbs number
  // and what number work package this should be
  const { carNumber, projectNumber, workPackageNumber } = projectWbsNum;

  if (workPackageNumber !== 0) throw new TypeError('Given WBS Number is not for a project.');

  const wbsElem = await prisma.wBS_Element.findUnique({
    where: {
      wbsNumber: {
        carNumber,
        projectNumber,
        workPackageNumber
      }
    },
    include: {
      project: {
        include: {
          workPackages: { include: { wbsElement: true, dependencies: true } }
        }
      }
    }
  });

  if (wbsElem === null) return buildNotFoundResponse('Wbs_Element_ID', projectWbsNum.toString());
  const { project } = wbsElem;

  if (project === null) return buildNotFoundResponse('Project_ID', projectNumber.toString());
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
    })
  );

  const dependenciesIds = dependenciesWBSElems.map((elem) => {
    if (elem === null) throw new TypeError('One of the dependencies was not found.');
    return elem.wbsElementId;
  });

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

  return buildSuccessResponse(created);
};

// expected structure of json body
const inputSchema = eventSchema(workPackageCreateInputSchemaBody);

const handler = middy(createWorkPackage)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
