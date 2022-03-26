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
  buildClientFailureResponse,
  buildSuccessResponse,
  DescriptionBullet,
  projectEditInputSchemaBody
} from 'utils';

const prisma = new PrismaClient();

export const descBulletConverter = (descBullet: Description_Bullet): DescriptionBullet => ({
  ...descBullet,
  id: descBullet.descriptionId ?? undefined,
  dateDeleted: descBullet.dateDeleted ?? undefined
});

export const editProject: Handler = async ({ body }, _context) => {
  const {
    wbsElementId,
    crId,
    userId,
    budget,
    summary,
    rules,
    goals,
    features,
    otherConstraints,
    name,
    wbsElementStatus
  } = body;

  // get the original project so we can compare things
  const originalProject = await prisma.project.findUnique({
    where: {
      wbsElementId
    },
    include: {
      wbsElement: true,
      goals: true,
      features: true,
      otherConstraints: true
    }
  });

  // if it doesn't exist we error
  if (originalProject === null) {
    return buildClientFailureResponse('Project with given wbsElementId does not exist!');
  }

  let changes = [];
  // get the changes or undefined for each non-optional fields and add it to changes
  const nameChangeJson = createChangeJsonNonList(
    'name',
    originalProject.wbsElement.name,
    name,
    crId,
    userId,
    wbsElementId
  );
  const budgetChangeJson = createChangeJsonNonList(
    'budget',
    originalProject.budget,
    budget,
    crId,
    userId,
    wbsElementId
  );
  const summaryChangeJson = createChangeJsonNonList(
    'summary',
    originalProject.summary,
    summary,
    crId,
    userId,
    wbsElementId
  );
  const statusChangeJson = createChangeJsonNonList(
    'status',
    originalProject.wbsElement.status,
    wbsElementStatus,
    crId,
    userId,
    wbsElementId
  );
  // add to changes if not undefined
  if (nameChangeJson !== undefined) {
    changes.push(nameChangeJson);
  }
  if (budgetChangeJson !== undefined) {
    changes.push(budgetChangeJson);
  }
  if (summaryChangeJson !== undefined) {
    changes.push(summaryChangeJson);
  }
  if (statusChangeJson !== undefined) {
    changes.push(statusChangeJson);
  }

  // Dealing with optional arguments
  if (body.hasOwnProperty('googleDriveFolderLink')) {
    const driveChangeJson = createChangeJsonNonList(
      'google drive folder link',
      originalProject.googleDriveFolderLink,
      body.googleDriveFolderLink,
      crId,
      userId,
      wbsElementId
    );
    if (driveChangeJson !== undefined) {
      changes.push(driveChangeJson);
    }
  }
  if (body.hasOwnProperty('slideDeckLink')) {
    const slideChangeJson = createChangeJsonNonList(
      'slide deck link',
      originalProject.slideDeckLink,
      body.slideDeckLink,
      crId,
      userId,
      wbsElementId
    );
    if (slideChangeJson !== undefined) {
      changes.push(slideChangeJson);
    }
  }
  if (body.hasOwnProperty('bomLink')) {
    const bomChangeJson = createChangeJsonNonList(
      'bom link',
      originalProject.bomLink,
      body.bomLink,
      crId,
      userId,
      wbsElementId
    );
    if (bomChangeJson !== undefined) {
      changes.push(bomChangeJson);
    }
  }
  if (body.hasOwnProperty('taskListLink')) {
    const taskChangeJson = createChangeJsonNonList(
      'task list link',
      originalProject.taskListLink,
      body.taskListLink,
      crId,
      userId,
      wbsElementId
    );
    if (taskChangeJson !== undefined) {
      changes.push(taskChangeJson);
    }
  }
  if (body.hasOwnProperty('projectManager')) {
    const projectManagerChangeJson = createChangeJsonNonList(
      'project manager',
      originalProject.wbsElement.projectManagerId,
      body.projectManager,
      crId,
      userId,
      wbsElementId
    );
    if (projectManagerChangeJson !== undefined) {
      changes.push(projectManagerChangeJson);
    }
  }
  if (body.hasOwnProperty('projectLead')) {
    const projectLeadChangeJson = createChangeJsonNonList(
      'project lead',
      originalProject.wbsElement.projectLeadId,
      body.projectLead,
      crId,
      userId,
      wbsElementId
    );
    if (projectLeadChangeJson !== undefined) {
      changes.push(projectLeadChangeJson);
    }
  }

  // Dealing with lists
  const rulesChangeJson = createRulesChangesJson(
    'rules',
    originalProject.rules,
    rules,
    crId,
    userId,
    wbsElementId
  );
  const goalsChangeJson = createDescriptionBulletChangesJson(
    originalProject.goals.map((element) => descBulletConverter(element)),
    goals,
    crId,
    userId,
    wbsElementId,
    'goals'
  );
  const featuresChangeJson = createDescriptionBulletChangesJson(
    originalProject.features.map((element) => descBulletConverter(element)),
    features,
    crId,
    userId,
    wbsElementId,
    'features'
  );
  const otherConstraintsChangeJson = createDescriptionBulletChangesJson(
    originalProject.otherConstraints.map((element) => descBulletConverter(element)),
    otherConstraints,
    crId,
    userId,
    wbsElementId,
    'other constraints'
  );
  // add the changes for each of dependencies, expected activities, and deliverables
  changes = changes
    .concat(rulesChangeJson)
    .concat(goalsChangeJson.changes)
    .concat(featuresChangeJson.changes)
    .concat(otherConstraintsChangeJson.changes);

  // update the project with the input fields
  const updatedProject = await prisma.project.update({
    where: {
      wbsElementId
    },
    data: {
      budget,
      summary,
      googleDriveFolderLink: body.googleDriveFolderLink,
      slideDeckLink: body.slideDeckLink,
      bomLink: body.bomLink,
      taskListLink: body.taskListLink,
      rules,
      wbsElement: {
        update: {
          name,
          status: wbsElementStatus,
          projectLeadId: body.projectLead,
          projectManagerId: body.projectManager
        }
      }
    }
  });

  // --> Pointer

  // Update any deleted description bullets to have their date deleted as right now
  const deletedIds = goalsChangeJson.deletedIds
    .concat(featuresChangeJson.deletedIds)
    .concat(otherConstraintsChangeJson.deletedIds);
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
  addDescriptionBullets(goalsChangeJson.addedDetails, updatedProject.projectId, 'projectIdGoals');
  addDescriptionBullets(
    featuresChangeJson.addedDetails,
    updatedProject.projectId,
    'projectIdFeatures'
  );
  addDescriptionBullets(
    otherConstraintsChangeJson.addedDetails,
    updatedProject.projectId,
    'projectIdOtherConstraints'
  );
  editDescriptionBullets(
    goalsChangeJson.editedIdsAndDetails
      .concat(featuresChangeJson.editedIdsAndDetails)
      .concat(otherConstraintsChangeJson.editedIdsAndDetails)
  );
  // create the changes in prisma
  await prisma.change.createMany({
    data: changes
  });

  // return the updated work package
  return buildSuccessResponse(updatedProject);
};

// /**
//  * HELPER METHODS:
//  */

// helper method to add the given description bullets into the database, linked to the given work package
const addDescriptionBullets = async (
  addedDetails: string[],
  id: number,
  descriptionBulletIdField: string
) => {
  // add the added bullets
  if (addedDetails.length > 0) {
    await prisma.description_Bullet.createMany({
      data: addedDetails.map((element) => {
        return {
          detail: element,
          [descriptionBulletIdField]: id
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

// create a change json list for a given list (rules). Only works if the elements themselves should be compared (strings)
export const createRulesChangesJson = (
  nameOfField: string,
  oldArray: string[],
  newArray: string[],
  crId: number,
  implementerId: number,
  wbsElementId: number
) => {
  const seenOld = new Set<string>(oldArray);
  const seenNew = new Set<string>(newArray);

  const changes: { element: string; type: string }[] = [];

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
  // Changes
  const changes: { element: DescriptionBullet; type: string }[] = [];

  // Elements from database that have not been deleted
  const oldArrayNotDeleted = oldArray.filter((element) => element.dateDeleted === undefined);
    return element.dateDeleted === undefined;
  });

  // All elements that were inputs but are not new
  const existingElements = new Map<number, string>();

  // Database version of edited elements
  const originalElements = new Map<number, string>();

  // Find new elements
  newArray.forEach((element) => {
    if (element.id === undefined) {
      changes.push({ element, type: 'Added new' });
    } else {
      existingElements.set(element.id, element.detail);
    }
  });

  // Find deleted and edited
  oldArrayNotDeleted.forEach((element) => {
    // Input version of old description element text
    const inputElText = existingElements.get(element.id);

    if (inputElText === undefined) {
      changes.push({ element, type: 'Removed' });
    } else if (inputElText !== element.detail) {
      changes.push({ element: { ...element, detail: inputElText }, type: 'Edited' });
      originalElements.set(element.id, element.detail);
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
          ? `${element.type} ${nameOfField} from "${originalElements.get(
              element.element.id
            )}" to "${existingElements.get(element.element.id)}"`
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
    body: projectEditInputSchemaBody
  }
};

const handler = middy(editProject)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
