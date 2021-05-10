/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { PrismaClient } from '@prisma/client';
import { dbSeedAllUsers } from './seed-data/users';
import { dbSeedAllProjects } from './seed-data/projects';
import { dbSeedAllWorkPackages } from './seed-data/work-packages';
import { dbSeedAllChangeRequests } from './seed-data/change-requests';

const prisma = new PrismaClient();

// const reasonWhyTypeMap: Map<ChangeRequestReason, Scope_CR_Why_Type> = new Map();
// reasonWhyTypeMap.set(ChangeRequestReason.Estimation, Scope_CR_Why_Type.ESTIMATION);
// reasonWhyTypeMap.set(ChangeRequestReason.Manufacturing, Scope_CR_Why_Type.MANUFACTURING);
// reasonWhyTypeMap.set(ChangeRequestReason.School, Scope_CR_Why_Type.SCHOOL);
// reasonWhyTypeMap.set(ChangeRequestReason.Rules, Scope_CR_Why_Type.RULES);
// reasonWhyTypeMap.set(ChangeRequestReason.OtherProject, Scope_CR_Why_Type.OTHER_PROJECT);
// reasonWhyTypeMap.set(ChangeRequestReason.Other, Scope_CR_Why_Type.OTHER);

// const reasonToDbWhyType: (reason: ChangeRequestReason) => Scope_CR_Why_Type = (reason) => {
//   if (reasonWhyTypeMap.get(reason) === undefined) {
//     throw new Error('reason not found in map');
//   }
//   return reasonWhyTypeMap.get(reason)!;
// };

const performSeed: () => Promise<void> = async () => {
  for (const seedUser of dbSeedAllUsers) {
    await prisma.user.create({ data: { ...seedUser } });
  }

  for (const seedProject of dbSeedAllProjects) {
    await prisma.project.create({
      data: {
        wbsElement: { create: { ...seedProject.wbsElementFields } },
        ...seedProject.projectFields
      }
    });
  }

  for (const seedWorkPackage of dbSeedAllWorkPackages) {
    await prisma.work_Package.create({
      data: {
        wbsElement: { create: { ...seedWorkPackage.wbsElementFields } },
        project: { connect: { projectId: seedWorkPackage.projectId } },
        ...seedWorkPackage.workPackageFields,
        descriptionBullets: { create: seedWorkPackage.descriptionBullets }
      }
    });
  }

  for (const seedChangeRequest of dbSeedAllChangeRequests) {
    const data: any = {
      submitter: { connect: { userId: seedChangeRequest.submitterId } },
      wbsElement: { connect: { wbsElementId: seedChangeRequest.wbsElementId } },
      ...seedChangeRequest.changeRequestFields,
      changes: { create: seedChangeRequest.changes }
    };
    if (seedChangeRequest.scopeChangeRequestFields) {
      data.scopeChangeRequest = {
        create: {
          ...seedChangeRequest.scopeChangeRequestFields.otherFields,
          why: { create: seedChangeRequest.scopeChangeRequestFields.why }
        }
      };
    }
    if (seedChangeRequest.activationChangeRequestFields) {
      data.activationChangeRequest = {
        create: {
          ...seedChangeRequest.activationChangeRequestFields.otherFields,
          projectLead: {
            connect: { userId: seedChangeRequest.activationChangeRequestFields.projectLeadId }
          },
          projectManager: {
            connect: { userId: seedChangeRequest.activationChangeRequestFields.projectManagerId }
          }
        }
      };
    }
    if (seedChangeRequest.stageGateChangeRequestFields) {
      data.stageGateChangeRequest = {
        create: { ...seedChangeRequest.stageGateChangeRequestFields }
      };
    }
    await prisma.change_Request.create({ data });
  }
};

performSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
