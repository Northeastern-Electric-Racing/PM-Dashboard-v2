/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { descBulletConverter } from './projects';
import { Handler } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';
import { buildSuccessResponse, DescriptionBullet, workPackageEditInputSchemaBody } from 'utils';

const prisma = new PrismaClient();

export const editWorkPackage: Handler = async ({ body }, _context) => {
  const {
    wbsElementId,
    userId,
    name,
    crId,
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
      wbsElement: true,
      dependencies: true,
      expectedActivities: true,
      deliverables: true
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
  const expectedActivitiesChangeJson = createDescriptionBulletChangesJson(
    originalWorkPackage.expectedActivities.map((element) => descBulletConverter(element)),
    expectedActivities,
    crId,
    userId,
    wbsElementId,
    'expected activity'
  );
  const deliverablesChangeJson = createDescriptionBulletChangesJson(
    originalWorkPackage.deliverables.map((element) => descBulletConverter(element)),
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
  if (startDateChangeJson !== undefined) {
    changes.push(startDateChangeJson);
  }
  if (durationChangeJson !== undefined) {
    changes.push(durationChangeJson);
  }

  // add the changes for each of dependencies, expected activities, and deliverables
  changes = changes
    .concat(dependenciesChangeJson)
    .concat(expectedActivitiesChangeJson.changes)
    .concat(deliverablesChangeJson.changes);

  // Update any deleted description bullets to have their date deleted as right now
  const deletedIds = expectedActivitiesChangeJson.deletedIds.concat(
    deliverablesChangeJson.deletedIds
  );
  if (deletedIds.length > 0) {
    await prisma.description_Bullet.updateMany({
      where: {
        descriptionId: {
          in: deletedIds
        }
      },
      data: {
        dateDeleted: new Date()
      }
    });
  }

  // update the work package with the input fields
  const updatedWorkPackage = await prisma.work_Package.update({
    where: {
      wbsElementId
    },
    data: {
      startDate,
      duration,
      wbsElement: {
        update: {
          name
        }
      },
      dependencies: {
        set: [], // remove all the connections then add all the given ones
        connect: wbsElementIds.map((ele: any) => {
          return { wbsElementId: ele };
        })
      }
    }
  });

  addDescriptionBullets(
    expectedActivitiesChangeJson.addedDetails,
    updatedWorkPackage.workPackageId,
    'workPackageIdExpectedActivities'
  );
  addDescriptionBullets(
    deliverablesChangeJson.addedDetails,
    updatedWorkPackage.workPackageId,
    'workPackageIdDeliverables'
  );
  editDescriptionBullets(
    expectedActivitiesChangeJson.editedIdsAndDetails.concat(
      deliverablesChangeJson.editedIdsAndDetails
    )
  );

  // create the changes in prisma
  await prisma.change.createMany({
    data: changes
  });

  // return the updated work package
  return buildSuccessResponse(updatedWorkPackage);
};

// helper method to add the given description bullets into the database, linked to the given work package
const addDescriptionBullets = async (
  addedDetails: string[],
  workPackageId: number,
  descriptionBulletIdField: string
) => {
  // add the added bullets
  if (addedDetails.length > 0) {
    await prisma.description_Bullet.createMany({
      data: addedDetails.map((element) => {
        return {
          detail: element,
          [descriptionBulletIdField]: workPackageId
        };
      })
    });
  }
};

// edit descrption bullets in the db for each id and detail pair
const editDescriptionBullets = async (editedIdsAndDetails: { id: number; detail: string }[]) => {
  // edit the edited bullets if there are any to update
  if (editedIdsAndDetails.length > 0) {
    await prisma.$transaction(
      editedIdsAndDetails.map((element) =>
        prisma.description_Bullet.update({
          where: {
            descriptionId: element.id
          },
          data: {
            detail: element.detail
          }
        })
      )
    );
  }
};

// create a change json if the old and new value are different, otherwise return undefined
export const createChangeJsonNonList = (
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
      implementerId,
      wbsElementId,
      detail: `Edited ${nameOfField} from "${oldValue}" to "${newValue}"`
    };
  }
  return undefined;
};

// create a change json list for a given list (dependencies). Only works if the elements themselves should be compared (numbers)
export const createListChangesJson = <T>(
  oldArray: T[],
  newArray: T[],
  crId: number,
  implementerId: number,
  wbsElementId: number,
  nameOfField: string
) => {
  const seenOld = new Set<T>(oldArray);
  const seenNew = new Set<T>(newArray);

  const changes: { element: T; type: string }[] = [];

  oldArray.forEach((element: T) => {
    if (!seenNew.has(element)) {
      changes.push({ element, type: 'Removed' });
    }
  });

  newArray.forEach((element: T) => {
    if (!seenOld.has(element)) {
      changes.push({ element, type: 'Added new' });
    }
  });

  return changes.map((element) => {
    return {
      changeRequestId: crId,
      implementerId,
      wbsElementId,
      detail: `${element.type} ${nameOfField} "${element.element}"`
    };
  });
};

// this method creates changes for description bullet inputs
// it returns it as an object of {deletedIds[], addedDetails[] changes[]}
// because the deletedIds are needed for the database and the addedDetails are needed to make new ones
export const createDescriptionBulletChangesJson = (
  oldArray: DescriptionBullet[],
  newArray: DescriptionBullet[],
  crId: number,
  implementerId: number,
  wbsElementId: number,
  nameOfField: string
): {
  deletedIds: number[];
  addedDetails: string[];
  editedIdsAndDetails: { id: number; detail: string }[];
  changes: {
    changeRequestId: number;
    implementerId: number;
    wbsElementId: number;
    detail: string;
  }[];
} => {
  const seenOld = new Map<number, string>();
  const seenNew = new Map<number, string>();
  oldArray.forEach((element) => {
    seenOld.set(element.id, element.detail);
  });

  newArray.forEach((element) => {
    seenNew.set(element.id, element.detail);
  });

  const changes: { element: DescriptionBullet; type: string }[] = [];
  const seenChanges = new Set<number>();

  oldArray.forEach((element) => {
    if (!seenNew.has(element.id)) {
      changes.push({ element, type: 'Removed' });
      seenChanges.add(element.id);
    } else if (seenNew.get(element.id) !== element.detail) {
      changes.push({ element, type: 'Edited' });
      seenChanges.add(element.id);
    }
  });

  newArray.forEach((element) => {
    if (!seenOld.has(element.id)) {
      changes.push({ element, type: 'Added new' });
      seenChanges.add(element.id);
    } else if (seenOld.get(element.id) !== element.detail && !seenChanges.has(element.id)) {
      changes.push({ element, type: 'Edited' });
      seenChanges.add(element.id);
    }
  });

  return {
    deletedIds: changes
      .filter((element) => element.type === 'Removed')
      .map((element) => {
        return element.element.id;
      }),
    addedDetails: changes
      .filter((element) => element.type === 'Added new')
      .map((element) => {
        return element.element.detail;
      }),
    editedIdsAndDetails: changes
      .filter((element) => element.type === 'Edited')
      .map((element) => {
        return { id: element.element.id, detail: element.element.detail };
      }),
    changes: changes.map((element) => {
      const detail =
        element.type === 'Edited'
          ? `${element.type} ${nameOfField} from "${seenOld.get(
              element.element.id
            )}" to "${seenNew.get(element.element.id)}"`
          : `${element.type} ${nameOfField} "${element.element.detail}"`;
      return {
        changeRequestId: crId,
        implementerId,
        wbsElementId,
        detail
      };
    })
  };
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
