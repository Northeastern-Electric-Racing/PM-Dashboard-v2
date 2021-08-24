/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import {
  Prisma,
  WBS_Element,
  User as dbUser,
  Role as dbRole,
  WBS_Element_Status
} from '@prisma/client';
import { ProjectSummary, WbsElementStatus, WbsNumber } from '../types/project-types';
import { Role, User } from '../types/user-types';

const workPackageDurationSelect = Prisma.validator<Prisma.Work_PackageArgs>()({
  select: { startDate: true, duration: true }
});

const allProjectsSummaryQuery = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    wbsElement: {
      include: { projectLead: true, projectManager: true }
    },
    workPackages: workPackageDurationSelect
  }
});

type WorkPackageDurationReturn = Prisma.Work_PackageGetPayload<typeof workPackageDurationSelect>;
type AllProjectsSummaryReturn = Prisma.ProjectGetPayload<typeof allProjectsSummaryQuery>;

const dbWBSNumTransformer = (data: WBS_Element) => {
  return {
    car: data.carNumber,
    project: data.projectNumber,
    workPackage: data.workPackageNumber
  } as WbsNumber;
};

const dbRoleTransformer = (role: dbRole) => {
  if (role === dbRole.APP_ADMIN) return Role.AppAdmin;
  if (role === dbRole.ADMIN) return Role.Admin;
  if (role === dbRole.LEADERSHIP) return Role.Leadership;
  if (role === dbRole.PROJECT_LEAD) return Role.ProjectLead;
  if (role === dbRole.PROJECT_MANAGER) return Role.ProjectManager;
  if (role === dbRole.MEMBER) return Role.Member;
  return Role.Guest;
};

const dbUserTransformer = (dbUser: dbUser) => {
  return {
    ...dbUser,
    id: dbUser.userId,
    role: dbRoleTransformer(dbUser.role)
  } as User;
};

const calculateEndDate = (start: Date, weeks: number) => {
  const end = new Date(start);
  end.setDate(start.getDate() + weeks * 7);
  return end;
};

const projectDurationBuilder = (wps: WorkPackageDurationReturn[]) => {
  if (wps.length === 0) return 0;
  if (wps.length === 1) return wps[0].duration;

  let firstStart = wps[0].startDate;
  let lastEnd = calculateEndDate(firstStart, wps[0].duration);

  for (const wp of wps) {
    if (wp.startDate < firstStart) firstStart = wp.startDate;
    const end = calculateEndDate(wp.startDate, wp.duration);
    if (end > lastEnd) lastEnd = end;
  }
  const durationMilliseconds = lastEnd.getTime() - firstStart.getTime();
  const durationWeeks = durationMilliseconds / (1000 * 60 * 60 * 24 * 7);
  return Math.round(durationWeeks);
};

const dbWbsElementStatusTransformer = (status: WBS_Element_Status) => {
  if (status === WBS_Element_Status.ACTIVE) return WbsElementStatus.Active;
  if (status === WBS_Element_Status.COMPLETE) return WbsElementStatus.Complete;
  return WbsElementStatus.Inactive;
};

const allProjectsSummaryTransformer = (data: AllProjectsSummaryReturn[]) => {
  return data.map((prj) => {
    return {
      wbsNum: dbWBSNumTransformer(prj.wbsElement),
      name: prj.wbsElement.name,
      projectLead: dbUserTransformer(prj.wbsElement.projectLead),
      projectManager: dbUserTransformer(prj.wbsElement.projectManager),
      duration: projectDurationBuilder(prj.workPackages),
      status: dbWbsElementStatusTransformer(prj.wbsElement.status)
    } as ProjectSummary;
  });
};

export {
  allProjectsSummaryQuery,
  allProjectsSummaryTransformer,
  calculateEndDate,
  projectDurationBuilder
};
