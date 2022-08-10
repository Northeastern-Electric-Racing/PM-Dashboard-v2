/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import {
  Description_Bullet,
  Prisma,
  PrismaClient,
  WBS_Element,
  WBS_Element_Status
} from '@prisma/client';
import {
  ApiRoute,
  ApiRouteFunction,
  apiRoutes,
  API_URL,
  buildServerFailureResponse,
  buildClientFailureResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  routeMatcher,
  WbsNumber,
  validateWBS,
  isProject,
  WorkPackage,
  WbsElementStatus,
  calculateEndDate,
  calculatePercentExpectedProgress,
  calculateTimelineStatus
} from 'utils';

const prisma = new PrismaClient();

const wpQueryArgs = Prisma.validator<Prisma.Work_PackageArgs>()({
  include: {
    wbsElement: {
      include: {
        projectLead: true,
        projectManager: true,
        changes: { include: { implementer: true }, orderBy: { dateImplemented: 'asc' } }
      }
    },
    expectedActivities: true,
    deliverables: true,
    dependencies: true
  }
});

const convertStatus = (status: WBS_Element_Status): WbsElementStatus =>
  ({
    INACTIVE: WbsElementStatus.Inactive,
    ACTIVE: WbsElementStatus.Active,
    COMPLETE: WbsElementStatus.Complete
  }[status]);

const wbsNumOf = (element: WBS_Element): WbsNumber => ({
  carNumber: element.carNumber,
  projectNumber: element.projectNumber,
  workPackageNumber: element.workPackageNumber
});

const descriptionBulletTransformer = (descBullet: Description_Bullet) => ({
  id: descBullet.descriptionId,
  detail: descBullet.detail,
  dateAdded: descBullet.dateAdded,
  dateDeleted: descBullet.dateDeleted ?? undefined
});

const workPackageTransformer = (wpInput: Prisma.Work_PackageGetPayload<typeof wpQueryArgs>) => {
  const expectedProgress = calculatePercentExpectedProgress(
    wpInput.startDate,
    wpInput.duration,
    wpInput.wbsElement.status
  );
  const wbsNum = wbsNumOf(wpInput.wbsElement);
  return {
    id: wpInput.workPackageId,
    dateCreated: wpInput.wbsElement.dateCreated,
    name: wpInput.wbsElement.name,
    orderInProject: wpInput.orderInProject,
    progress: wpInput.progress,
    startDate: wpInput.startDate,
    duration: wpInput.duration,
    expectedActivities: wpInput.expectedActivities.map(descriptionBulletTransformer),
    deliverables: wpInput.deliverables.map(descriptionBulletTransformer),
    dependencies: wpInput.dependencies.map(wbsNumOf),
    projectManager: wpInput.wbsElement.projectManager ?? undefined,
    projectLead: wpInput.wbsElement.projectLead ?? undefined,
    status: convertStatus(wpInput.wbsElement.status),
    wbsNum,
    endDate: calculateEndDate(wpInput.startDate, wpInput.duration),
    expectedProgress,
    timelineStatus: calculateTimelineStatus(wpInput.progress, expectedProgress),
    changes: wpInput.wbsElement.changes.map((change) => ({
      wbsNum,
      changeId: change.changeId,
      changeRequestId: change.changeRequestId,
      implementer: change.implementer,
      detail: change.detail,
      dateImplemented: change.dateImplemented
    }))
  } as WorkPackage;
};

// Fetch all work packages, optionally filtered by query parameters
const getAllWorkPackages: ApiRouteFunction = async (_, event) => {
  const { queryStringParameters: eQSP } = event;
  const workPackages = await prisma.work_Package.findMany(wpQueryArgs);
  const outputWorkPackages = workPackages.map(workPackageTransformer).filter((wp) => {
    let passes = true;
    if (eQSP?.status) passes &&= wp.status === eQSP?.status;
    if (eQSP?.timelineStatus) passes &&= wp.timelineStatus === eQSP?.timelineStatus;
    if (eQSP?.daysUntilDeadline) {
      const daysToDeadline = Math.round((wp.endDate.getTime() - new Date().getTime()) / 86400000);
      passes &&= daysToDeadline <= parseInt(eQSP?.daysUntilDeadline);
    }
    return passes;
  });
  outputWorkPackages.sort((wpA, wpB) => wpA.endDate.getTime() - wpB.endDate.getTime());
  return buildSuccessResponse(outputWorkPackages);
};

// Fetch the work package for the specified WBS number
const getSingleWorkPackage: ApiRouteFunction = async (params: { wbsNum: string }) => {
  const parsedWbs: WbsNumber = validateWBS(params.wbsNum);
  if (isProject(parsedWbs)) {
    return buildClientFailureResponse('WBS Number is a project WBS#, not a Work Package WBS#');
  }
  const wp = await prisma.work_Package.findFirst({
    where: {
      wbsElement: {
        carNumber: parsedWbs.carNumber,
        projectNumber: parsedWbs.projectNumber,
        workPackageNumber: parsedWbs.workPackageNumber
      }
    },
    ...wpQueryArgs
  });
  if (wp === null) return buildNotFoundResponse('work package', `WBS # ${params.wbsNum}`);
  return buildSuccessResponse(workPackageTransformer(wp));
};

// Define all valid routes for the endpoint
const routes: ApiRoute[] = [
  {
    path: `${API_URL}${apiRoutes.WORK_PACKAGES}`,
    httpMethod: 'GET',
    func: getAllWorkPackages
  },
  {
    path: `${API_URL}${apiRoutes.WORK_PACKAGES_BY_WBS}`,
    httpMethod: 'GET',
    func: getSingleWorkPackage
  }
];

// Handler for incoming requests
const handler: Handler = async (event, context) => {
  try {
    return routeMatcher(routes, event, context);
  } catch (error: any) {
    console.error(error);
    return buildServerFailureResponse(error.message);
  }
};

export { handler };
