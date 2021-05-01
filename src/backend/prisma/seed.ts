/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { PrismaClient, CR_Type, Scope_CR_Why_Type, WBS_Element_Status } from '@prisma/client';
import {
  ChangeRequestReason,
  exampleAllUsers,
  exampleProject1,
  exampleStandardChangeRequest
} from 'utils';

const prisma = new PrismaClient();

const reasonWhyTypeMap: Map<ChangeRequestReason, Scope_CR_Why_Type> = new Map();
reasonWhyTypeMap.set(ChangeRequestReason.Estimation, Scope_CR_Why_Type.ESTIMATION);
reasonWhyTypeMap.set(ChangeRequestReason.Manufacturing, Scope_CR_Why_Type.MANUFACTURING);
reasonWhyTypeMap.set(ChangeRequestReason.School, Scope_CR_Why_Type.SCHOOL);
reasonWhyTypeMap.set(ChangeRequestReason.Rules, Scope_CR_Why_Type.RULES);
reasonWhyTypeMap.set(ChangeRequestReason.OtherProject, Scope_CR_Why_Type.OTHER_PROJECT);
reasonWhyTypeMap.set(ChangeRequestReason.Other, Scope_CR_Why_Type.OTHER);

const reasonToDbWhyType: (reason: ChangeRequestReason) => Scope_CR_Why_Type = (reason) => {
  if (reasonWhyTypeMap.get(reason) === undefined) {
    throw new Error('reason not found in map');
  }
  return reasonWhyTypeMap.get(reason)!;
};

const performSeed: () => Promise<void> = async () => {
  for (const exampleUser of exampleAllUsers) {
    await prisma.user.create({
      data: {
        userId: exampleUser.id,
        firstName: exampleUser.firstName,
        lastName: exampleUser.lastName,
        emailId: exampleUser.emailId,
        lastLogin: exampleUser.lastLogin
      }
    });
  }

  await prisma.project.create({
    data: {
      wbsElement: {
        create: {
          carNumber: exampleProject1.wbsNum.car,
          projectNumber: exampleProject1.wbsNum.project,
          workPackageNumber: exampleProject1.wbsNum.workPackage,
          name: exampleProject1.name,
          status: WBS_Element_Status.ACTIVE,
          projectLeadId: exampleProject1.projectLead.id,
          projectManagerId: exampleProject1.projectManager.id
        }
      },
      googleDriveFolderLink: exampleProject1.gDriveLink,
      slideDeckLink: exampleProject1.slideDeckLink,
      bomLink: exampleProject1.bomLink,
      taskListLink: exampleProject1.taskListLink
    }
  });

  await prisma.change_Request.create({
    data: {
      crId: exampleStandardChangeRequest.id,
      submitterId: exampleStandardChangeRequest.submitter.id,
      wbsElementId: 1,
      dateSubmitted: exampleStandardChangeRequest.dateSubmitted,
      type: CR_Type.DESIGN_ISSUE,
      dateReviewed: exampleStandardChangeRequest.dateReviewed,
      accepted: exampleStandardChangeRequest.accepted,
      reviewNotes: exampleStandardChangeRequest.reviewNotes,
      scopeChangeRequest: {
        create: {
          what: exampleStandardChangeRequest.what,
          why: {
            create: exampleStandardChangeRequest.why.map((whyEle) => {
              return {
                type: reasonToDbWhyType(whyEle.reason),
                explain: whyEle.explain
              };
            })
          },
          scopeImpact: exampleStandardChangeRequest.scopeImpact,
          timelineImpact: exampleStandardChangeRequest.timelineImpact,
          budgetImpact: exampleStandardChangeRequest.budgetImpact
        }
      }
    }
  });
};

performSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
