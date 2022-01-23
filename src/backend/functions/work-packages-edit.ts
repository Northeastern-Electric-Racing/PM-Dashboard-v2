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
import { buildSuccessResponse, workPackageEditInputSchemaBody } from 'utils';

const prisma = new PrismaClient();

export const editWorkPackage: Handler = async ({ body }, _context) => {
  const {
    wbsElementId,
    userId,
    name,
    crId,
    projectId,
    startDate,
    duration,
    wbsElementIds,
    expectedActivities,
    deliverables
  } = body;

  // get the original work package so we can compare things
  const originalWorkPackage = await prisma.work_Package.findUnique({
    where: {
      wbsElementId
    },
    include: {
      wbsElement: {},
      dependencies: {},
      expectedActivities,
      deliverables
    }
  });

  // if it doesn't exist we error
  if (originalWorkPackage === null) {
    throw new TypeError('Work Package with given wbsElementId does not exist!');
  }

  let changes = [];
  // get the changes or undefined for each of the fields
  const nameChangeJson = createChangeJsonNonList(
    'name',
    name,
    originalWorkPackage.wbsElement.name,
    crId,
    userId,
    wbsElementId
  );
  const projectIdChangeJson = createChangeJsonNonList(
    'project id',
    projectId,
    originalWorkPackage.projectId,
    crId,
    userId,
    wbsElementId
  );
  const startDateChangeJson = createChangeJsonNonList(
    'start date',
    startDate,
    originalWorkPackage.startDate,
    crId,
    userId,
    wbsElementId
  );
  const durationChangeJson = createChangeJsonNonList(
    'duration',
    duration,
    originalWorkPackage.duration,
    crId,
    userId,
    wbsElementId
  );
  const dependenciesChangeJson = createListChangesJson(
    originalWorkPackage.dependencies.map((element) => {
      return element.wbsElementId;
    }),
    wbsElementIds,
    crId,
    userId,
    wbsElementId,
    'dependency'
  );
  const expectedActivitiesChangeJson = createListChangesJson(
    originalWorkPackage.expectedActivities.map((element) => {
      return element.detail;
    }),
    expectedActivities,
    crId,
    userId,
    wbsElementId,
    'expected activity'
  );
  const deliverablesChangeJson = createListChangesJson(
    originalWorkPackage.deliverables.map((element) => {
      return element.detail;
    }),
    deliverables,
    crId,
    userId,
    wbsElementId,
    'deliverable'
  );

  // add to changes if not undefined
  if (nameChangeJson !== undefined) {
    changes.push(nameChangeJson);
  }
  if (projectIdChangeJson !== undefined) {
    changes.push(projectIdChangeJson);
  }
  if (startDateChangeJson !== undefined) {
    changes.push(startDateChangeJson);
  }
  if (durationChangeJson !== undefined) {
    changes.push(durationChangeJson);
  }

  changes = changes
    .concat(dependenciesChangeJson)
    .concat(expectedActivitiesChangeJson)
    .concat(deliverablesChangeJson);

  // update the work package with the input fields
  const updatedWorkPackage = await prisma.work_Package.update({
    where: {
      wbsElementId
    },
    data: {
      projectId,
      startDate,
      duration,
      wbsElement: {
        update: {
          name
        }
      },
      dependencies: {
        connect: wbsElementIds.map((ele: any) => {
          return { wbsElementId: ele };
        })
      },
      expectedActivities: {
        create: expectedActivities.map((ele: any) => {
          return { detail: ele };
        })
      },
      deliverables: {
        create: deliverables.map((ele: any) => {
          return { detail: ele };
        })
      }
    }
  });

  // create the changes in prisma
  await prisma.change.createMany({
    data: changes
  });

  // return the updated work package
  return buildSuccessResponse(updatedWorkPackage);
};

// create a change json if the old and new value are different, otherwise return undefined
const createChangeJsonNonList = (
  nameOfField: string,
  oldValue: any,
  newValue: any,
  crId: number,
  implementerId: number,
  wbsElementId: number
) => {
  if (oldValue !== newValue) {
    return {
      changeRequestId: crId,
      dateImplemented: new Date(),
      implementerId,
      wbsElementId,
      detail: `Changed ${nameOfField} from ${oldValue} to ${newValue}`
    };
  }
  return undefined;
};

// create a change json list for a given list (dependencies). Only works if the elements can only be added or deleted
const createListChangesJson = <T>(
  oldArray: T[],
  newArray: T[],
  crId: number,
  implementerId: number,
  wbsElementId: number,
  nameOfField: string
) => {
  const seenOld = new Set<T>();
  const seenNew = new Set<T>();
  oldArray.forEach((element: T) => {
    seenOld.add(element);
  });

  newArray.forEach((element: T) => {
    seenNew.add(element);
  });

  const changes: { element: T; type: string }[] = [];

  oldArray.forEach((element: T) => {
    if (seenNew.has(element)) {
      changes.push({ element, type: 'Removed' });
    }
  });

  newArray.forEach((element: T) => {
    if (seenOld.has(element)) {
      changes.push({ element, type: 'Added new' });
    }
  });

  return changes.map((element) => {
    return {
      changeRequestId: crId,
      dateImplemented: new Date(),
      implementerId,
      wbsElementId,
      detail: `${element.type} ${nameOfField}: ${element.element}`
    };
  });
};

// expected structure of json body
const inputSchema = {
  type: 'object',
  properties: {
    body: workPackageEditInputSchemaBody
  }
};

const handler = middy(editWorkPackage)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
