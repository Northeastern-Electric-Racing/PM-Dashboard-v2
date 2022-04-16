/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { Description_Bullet, PrismaClient } from '@prisma/client';
import {
  buildNotFoundResponse,
  buildSuccessResponse,
  DescriptionBullet,
  eventSchema,
  workPackageEditInputSchemaBody
} from 'utils';
import { FromSchema } from 'json-schema-to-ts';

const prisma = new PrismaClient();

export const descBulletConverter = (descBullet: Description_Bullet): DescriptionBullet => ({
  ...descBullet,
  id: descBullet.descriptionId,
  dateDeleted: descBullet.dateDeleted ?? undefined
});

const getWbsElementId = async ({
  carNumber,
  projectNumber,
  workPackageNumber
}: {
  carNumber: number;
  projectNumber: number;
  workPackageNumber: number;
}) => {
  const wbsElem = await prisma.wBS_Element.findUnique({
    where: {
      wbsNumber: { carNumber, projectNumber, workPackageNumber }
    }
  });
  return wbsElem?.wbsElementId;
};

export const editWorkPackage: Handler<FromSchema<typeof inputSchema>> = async (
  { body },
  _context
) => {
  const {
    workPackageId,
    userId,
    name,
    crId,
    startDate,
    duration,
    dependencies,
    expectedActivities,
    deliverables,
    wbsElementStatus,
    progress,
    projectLead,
    projectManager
  } = body;

  // get the original work package so we can compare things
  const originalWorkPackage = await prisma.work_Package.findUnique({
    where: { workPackageId },
    include: {
      wbsElement: true,
      dependencies: true,
      expectedActivities: true,
      deliverables: true
    }
  });

  // if it doesn't exist we error
  if (originalWorkPackage === null) {
    return buildNotFoundResponse('Work Package', workPackageId!.toString());
  }

  const { wbsElementId } = originalWorkPackage;

  // if the crId doesn't match a valid approved change request then we need to error
  const changeRequest = await prisma.change_Request.findUnique({ where: { crId } });

  if (!changeRequest?.accepted) {
    return buildNotFoundResponse('Valid_Change_Request', crId.toString());
  }

  const depsIds = await Promise.all(dependencies.map(async (wbsNum) => getWbsElementId(wbsNum)));

  if (depsIds.includes(undefined)) {
    return buildNotFoundResponse('Dependency', depsIds.toString());
  }

  let changes = [];
  // get the changes or undefined for each of the fields
  const nameChangeJson = createChangeJsonNonList(
    'name',
    originalWorkPackage.wbsElement.name,
    name,
    crId,
    userId,
    wbsElementId!
  );
  const startDateChangeJson = createChangeJsonDates(
    'start date',
    originalWorkPackage.startDate,
    new Date(startDate),
    crId,
    userId,
    wbsElementId!
  );
  const durationChangeJson = createChangeJsonNonList(
    'duration',
    originalWorkPackage.duration,
    duration,
    crId,
    userId,
    wbsElementId!
  );
  const progressChangeJson = createChangeJsonNonList(
    'progress',
    originalWorkPackage.progress,
    progress,
    crId,
    userId,
    wbsElementId!
  );
  const wbsElementStatusChangeJson = createChangeJsonNonList(
    'WBS element status',
    originalWorkPackage.wbsElement.status,
    wbsElementStatus,
    crId,
    userId,
    wbsElementId!
  );
  const dependenciesChangeJson = await createDependenciesChangesJson(
    originalWorkPackage.dependencies.map((element) => element.wbsElementId),
    depsIds.map((elem) => elem as number),
    crId,
    userId,
    wbsElementId!,
    'dependency'
  );
  const expectedActivitiesChangeJson = createDescriptionBulletChangesJson(
    originalWorkPackage.expectedActivities
      .filter((ele) => !ele.dateDeleted)
      .map((element) => descBulletConverter(element)),
    expectedActivities,
    crId,
    userId,
    wbsElementId!,
    'expected activity'
  );
  const deliverablesChangeJson = createDescriptionBulletChangesJson(
    originalWorkPackage.deliverables
      .filter((ele) => !ele.dateDeleted)
      .map((element) => descBulletConverter(element)),
    deliverables,
    crId,
    userId,
    wbsElementId!,
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
  if (progressChangeJson !== undefined) {
    changes.push(progressChangeJson);
  }
  if (wbsElementStatusChangeJson !== undefined) {
    changes.push(wbsElementStatusChangeJson);
  }

  if (body.hasOwnProperty('projectManager')) {
    const projectManagerChangeJson = createChangeJsonNonList(
      'project manager',
      originalWorkPackage.wbsElement.projectManagerId,
      body.projectManager,
      crId,
      userId,
      wbsElementId!
    );
    if (projectManagerChangeJson) {
      changes.push(projectManagerChangeJson);
    }
  }

  if (body.hasOwnProperty('projectLead')) {
    const projectLeadChangeJson = createChangeJsonNonList(
      'project lead',
      originalWorkPackage.wbsElement.projectLeadId,
      body.projectLead,
      crId,
      userId,
      wbsElementId!
    );
    if (projectLeadChangeJson) {
      changes.push(projectLeadChangeJson);
    }
  }

  // add the changes for each of dependencies, expected activities, and deliverables
  changes = changes
    .concat(dependenciesChangeJson)
    .concat(expectedActivitiesChangeJson.changes)
    .concat(deliverablesChangeJson.changes);

  // update the work package with the input fields
  const updatedWorkPackage = await prisma.work_Package.update({
    where: { wbsElementId },
    data: {
      startDate: new Date(startDate),
      duration,
      progress,
      wbsElement: {
        update: {
          name,
          status: wbsElementStatus,
          projectLeadId: projectLead,
          projectManagerId: projectManager
        }
      },
      dependencies: {
        set: [], // remove all the connections then add all the given ones
        connect: depsIds.map((ele) => ({ wbsElementId: ele }))
      }
    }
  });

  // Update any deleted description bullets to have their date deleted as right now
  const deletedIds = expectedActivitiesChangeJson.deletedIds.concat(
    deliverablesChangeJson.deletedIds
  );
  if (deletedIds.length > 0) {
    await prisma.description_Bullet.updateMany({
      where: { descriptionId: { in: deletedIds } },
      data: { dateDeleted: new Date() }
    });
  }

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
  await prisma.change.createMany({ data: changes });

  // return the updated work package
  return buildSuccessResponse(updatedWorkPackage);
};

/**
 * HELPER METHODS:
 */

// helper method to add the given description bullets into the database, linked to the given work package
const addDescriptionBullets = async (
  addedDetails: string[],
  workPackageId: number,
  descriptionBulletIdField: string
) => {
  if (addedDetails.length < 1) return;
  // add the added bullets
  await prisma.description_Bullet.createMany({
    data: addedDetails.map((element) => ({
      detail: element,
      [descriptionBulletIdField]: workPackageId
    }))
  });
};

// edit descrption bullets in the db for each id and detail pair
const editDescriptionBullets = async (editedIdsAndDetails: { id: number; detail: string }[]) => {
  if (editedIdsAndDetails.length < 1) return;
  // edit the edited bullets if there are any to update
  await prisma.$transaction(
    editedIdsAndDetails.map((element) =>
      prisma.description_Bullet.update({
        where: { descriptionId: element.id },
        data: { detail: element.detail }
      })
    )
  );
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
  if (oldValue == null) {
    return {
      changeRequestId: crId,
      implementerId,
      wbsElementId,
      detail: `Added ${nameOfField} "${newValue}"`
    };
  } else if (oldValue !== newValue) {
    return {
      changeRequestId: crId,
      implementerId,
      wbsElementId,
      detail: `Edited ${nameOfField} from "${oldValue}" to "${newValue}"`
    };
  }
  return undefined;
};

// create a change json if the old and new dates are different, otherwise return undefined
export const createChangeJsonDates = (
  nameOfField: string,
  oldValue: Date,
  newValue: Date,
  crId: number,
  implementerId: number,
  wbsElementId: number
) => {
  if (oldValue.getTime() !== newValue.getTime()) {
    return {
      changeRequestId: crId,
      implementerId,
      wbsElementId,
      detail: `Edited ${nameOfField} from "${oldValue.toDateString()}" to "${newValue.toDateString()}"`
    };
  }
  return undefined;
};

// create a change json list for a given list (dependencies). Only works if the elements themselves should be compared (numbers)
export const createDependenciesChangesJson = async (
  oldArray: number[],
  newArray: number[],
  crId: number,
  implementerId: number,
  wbsElementId: number,
  nameOfField: string
) => {
  const seenOld = new Set<number>(oldArray);
  const seenNew = new Set<number>(newArray);

  const changes: { element: number; type: string }[] = [];

  oldArray.forEach((element) => {
    if (!seenNew.has(element)) {
      changes.push({ element, type: 'Removed' });
    }
  });

  newArray.forEach((element) => {
    if (!seenOld.has(element)) {
      changes.push({ element, type: 'Added new' });
    }
  });

  // get the wbs number of each changing dependency for the change string
  const changedDependencies = await prisma.wBS_Element.findMany({
    where: { wbsElementId: { in: changes.map((element) => element.element) } }
  });

  const wbsNumbers = new Map(
    changedDependencies.map((element) => [
      element.wbsElementId,
      `${element.carNumber}.${element.projectNumber}.${element.workPackageNumber}`
    ])
  );

  return changes.map((element) => {
    return {
      changeRequestId: crId,
      implementerId,
      wbsElementId,
      detail: `${element.type} ${nameOfField} "${wbsNumbers.get(element.element)}"`
    };
  });
};

// this method creates changes for description bullet inputs
// it returns it as an object of {deletedIds[], addedDetails[] changes[]}
// because the deletedIds are needed for the database and the addedDetails are needed to make new ones
export const createDescriptionBulletChangesJson = (
  oldArray: DescriptionBullet[],
  newArray: { id: number; detail: string }[],
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
  const seenOld = new Map<number, string>(oldArray.map((ele) => [ele.id, ele.detail]));
  const seenNew = new Map<number, string>(newArray.map((ele) => [ele.id, ele.detail]));

  const changes: { element: { id: number; detail: string }; type: string }[] = [];

  oldArray.forEach((element) => {
    if (!seenNew.has(element.id)) {
      changes.push({ element: { id: element.id, detail: element.detail }, type: 'Removed' });
    }
  });

  newArray.forEach((element) => {
    if (element.id < 0 || !seenOld.has(element.id)) {
      changes.push({ element, type: 'Added new' });
    } else if (seenOld.get(element.id) !== element.detail) {
      changes.push({ element, type: 'Edited' });
    }
  });

  return {
    deletedIds: changes
      .filter((element) => element.type === 'Removed')
      .map((element) => element.element.id),
    addedDetails: changes
      .filter((element) => element.type === 'Added new')
      .map((element) => element.element.detail),
    editedIdsAndDetails: changes
      .filter((element) => element.type === 'Edited')
      .map((element) => element.element),
    changes: changes.map((element) => {
      const detail =
        element.type === 'Edited'
          ? `${element.type} ${nameOfField} from "${seenOld.get(
              element.element.id
            )}" to "${seenNew.get(element.element.id)}"`
          : `${element.type} ${nameOfField} "${element.element.detail}"`;
      return { changeRequestId: crId, implementerId, wbsElementId, detail };
    })
  };
};

// expected structure of json body
const inputSchema = eventSchema(workPackageEditInputSchemaBody);

const handler = middy(editWorkPackage)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
