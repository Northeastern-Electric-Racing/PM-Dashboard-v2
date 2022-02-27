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
import { buildSuccessResponse, DescriptionBullet, projectEditInputSchemaBody } from 'utils';

const prisma = new PrismaClient();

export const descBulletConverter = (descBullet: Description_Bullet): DescriptionBullet => ({
  ...descBullet,
  id: descBullet.descriptionId,
  dateDeleted: descBullet.dateDeleted ?? undefined
});

export const editProject: Handler = async ({ body }, _context) => {
  const {
    wbsElementId,
    crId,
    userId,
    budget,
    summary,
    googleDriveFolderLink,
    slideDeckLink,
    bomLink,
    taskListLink,
    rules,
    goals,
    features,
    otherConstraints,
    name,
    status,
    projectLeadId,
    projectManagerId
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
    throw new TypeError('Project with given wbsElementId does not exist!');
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
    status,
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
      googleDriveFolderLink,
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
      slideDeckLink,
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
      bomLink,
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
      taskListLink,
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

  // --> Pointer

  // Dealing with lists
  // TODO: Fix this one
  const rulesChangeJson = createRulesChangesJson(
    originalProject.rules,
    rules,
    crId,
    userId,
    wbsElementId,
    'rules'
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

  //   // update the work package with the input fields
  //   const updatedWorkPackage = await prisma.work_Package.update({
  //     where: {
  //       wbsElementId
  //     },
  //     data: {
  //       startDate: new Date(startDate),
  //       duration,
  //       progress,
  //       wbsElement: {
  //         update: {
  //           name,
  //           status: wbsElementStatus,
  //           projectLeadId: body.projectLead,
  //           projectManagerId: body.projectManager
  //         }
  //       },
  //       dependencies: {
  //         set: [], // remove all the connections then add all the given ones
  //         connect: wbsElementIds.map((ele: any) => {
  //           return { wbsElementId: ele };
  //         })
  //       }
  //     }
  //   });
  //   // Update any deleted description bullets to have their date deleted as right now
  //   const deletedIds = expectedActivitiesChangeJson.deletedIds.concat(
  //     deliverablesChangeJson.deletedIds
  //   );
  //   if (deletedIds.length > 0) {
  //     await prisma.description_Bullet.updateMany({
  //       where: {
  //         descriptionId: {
  //           in: deletedIds
  //         }
  //       },
  //       data: {
  //         dateDeleted: new Date()
  //       }
  //     });
  //   }
  //   addDescriptionBullets(
  //     expectedActivitiesChangeJson.addedDetails,
  //     updatedWorkPackage.workPackageId,
  //     'workPackageIdExpectedActivities'
  //   );
  //   addDescriptionBullets(
  //     deliverablesChangeJson.addedDetails,
  //     updatedWorkPackage.workPackageId,
  //     'workPackageIdDeliverables'
  //   );
  //   editDescriptionBullets(
  //     expectedActivitiesChangeJson.editedIdsAndDetails.concat(
  //       deliverablesChangeJson.editedIdsAndDetails
  //     )
  //   );
  //   // create the changes in prisma
  //   await prisma.change.createMany({
  //     data: changes
  //   });
  //   // return the updated work package
  //   return buildSuccessResponse(updatedWorkPackage);
};

// /**
//  * HELPER METHODS:
//  */

// // helper method to add the given description bullets into the database, linked to the given work package
// const addDescriptionBullets = async (
//   addedDetails: string[],
//   workPackageId: number,
//   descriptionBulletIdField: string
// ) => {
//   // add the added bullets
//   if (addedDetails.length > 0) {
//     await prisma.description_Bullet.createMany({
//       data: addedDetails.map((element) => {
//         return {
//           detail: element,
//           [descriptionBulletIdField]: workPackageId
//         };
//       })
//     });
//   }
// };

// // edit descrption bullets in the db for each id and detail pair
// const editDescriptionBullets = async (editedIdsAndDetails: { id: number; detail: string }[]) => {
//   // edit the edited bullets if there are any to update
//   if (editedIdsAndDetails.length > 0) {
//     await prisma.$transaction(
//       editedIdsAndDetails.map((element) =>
//         prisma.description_Bullet.update({
//           where: {
//             descriptionId: element.id
//           },
//           data: {
//             detail: element.detail
//           }
//         })
//       )
//     );
//   }
// };

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

// create a change json list for a given list (rules). Only works if the elements themselves should be compared (strings)
export const createRulesChangesJson = async (
  oldArray: string[],
  newArray: string[],
  crId: number,
  implementerId: number,
  wbsElementId: number,
  nameOfField: string
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

  // get the wbs number of each changing dependency for the change string
  const changedDependencies = await prisma.wBS_Element.findMany({
    where: {
      wbsElementId: {
        in: changes.map((element) => element.element)
      }
    }
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

  oldArray.forEach((element) => {
    if (!seenNew.has(element.id)) {
      changes.push({ element, type: 'Removed' });
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

// // expected structure of json body
// const inputSchema = {
//   type: 'object',
//   properties: {
//     body: projectEditInputSchemaBody
//   }
// };

// const handler = middy(editWorkPackage)
//   .use(jsonBodyParser())
//   .use(validator({ inputSchema }))
//   .use(httpErrorHandler());

// export { handler };
