/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { Prisma, PrismaClient, WBS_Element, WBS_Element_Status } from '@prisma/client';
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
  calculatePercentExpectedProgress
} from 'utils';

const prisma = new PrismaClient();

const manyRelationArgs = Prisma.validator<Prisma.Work_PackageArgs>()({
  include: {
    wbsElement: {
      include: {
        projectLead: true,
        projectManager: true,
        changes: { include: { implementer: true } }
      }
    },
    expectedActivities: true,
    deliverables: true,
    dependencies: true
  }
});

const uniqueRelationArgs = Prisma.validator<Prisma.WBS_ElementArgs>()({
  include: {
    workPackage: { include: { expectedActivities: true, deliverables: true, dependencies: true } },
    projectLead: true,
    projectManager: true,
    changes: { include: { implementer: true } }
  }
});

const convertStatus = (status: WBS_Element_Status): WbsElementStatus =>
  ({
    INACTIVE: WbsElementStatus.Inactive,
    ACTIVE: WbsElementStatus.Active,
    COMPLETE: WbsElementStatus.Complete
  }[status]);

const wbsNumOf = (element: WBS_Element): WbsNumber => ({
  car: element.carNumber,
  project: element.projectNumber,
  workPackage: element.workPackageNumber
});

const workPackageTransformer = (
  payload:
    | Prisma.Work_PackageGetPayload<typeof manyRelationArgs>
    | Prisma.WBS_ElementGetPayload<typeof uniqueRelationArgs>
): WorkPackage => {
  if (payload === null) throw new TypeError('WBS_Element not found');
  const wbsElement = 'wbsElement' in payload ? payload.wbsElement : payload;
  const workPackage = 'workPackage' in payload ? payload.workPackage! : payload;
  const endDate = new Date(workPackage.startDate);
  endDate.setDate(workPackage.duration * 7);

  const wbsNum = wbsNumOf(wbsElement);
  return {
    ...workPackage,
    ...wbsElement,
    id: workPackage.workPackageId,
    expectedActivities: workPackage.expectedActivities.map((descBullet) => ({
      ...descBullet,
      id: descBullet.descriptionId,
      dateDeleted: descBullet.dateDeleted ?? undefined
    })),
    deliverables: workPackage.deliverables.map((deliverable) => ({
      ...deliverable,
      id: deliverable.descriptionId,
      dateDeleted: deliverable.dateDeleted ?? undefined
    })),
    changes: wbsElement.changes.map((change) => ({
      ...change,
      wbsNum
    })),
    dependencies: workPackage.dependencies.map(wbsNumOf),
    projectManager: wbsElement.projectManager ?? undefined,
    projectLead: wbsElement.projectLead ?? undefined,
    status: convertStatus(wbsElement.status),
    wbsNum,
    endDate,
    expectedProgress: calculatePercentExpectedProgress(
      workPackage.startDate,
      workPackage.duration,
      wbsElement.status
    )
  };
};

// Fetch all work packages
const getAllWorkPackages: ApiRouteFunction = async () => {
  const workPackages = await prisma.work_Package.findMany(manyRelationArgs);
  return buildSuccessResponse(workPackages.map(workPackageTransformer));
};

// Fetch the work package for the specified WBS number
const getSingleWorkPackage: ApiRouteFunction = async (params: { wbsNum: string }) => {
  const parsedWbs: WbsNumber = validateWBS(params.wbsNum);
  if (isProject(parsedWbs)) {
    return buildClientFailureResponse('WBS Number is a project WBS#, not a Work Package WBS#');
  }
  const wbsEle = await prisma.wBS_Element.findUnique({
    where: {
      wbsNumber: {
        carNumber: parsedWbs.car,
        projectNumber: parsedWbs.project,
        workPackageNumber: parsedWbs.workPackage
      }
    },
    ...uniqueRelationArgs
  });
  if (wbsEle === null) {
    return buildNotFoundResponse('work package', `WBS # ${params.wbsNum}`);
  }
  return buildSuccessResponse(workPackageTransformer(wbsEle));
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
