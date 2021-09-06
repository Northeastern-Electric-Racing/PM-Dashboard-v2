/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
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
  isProject
} from 'utils';

const prisma = new PrismaClient();

// Fetch all work packages
const getAllWorkPackages: ApiRouteFunction = async () => {
  const workPackages = await prisma.work_Package.findMany({
    include: {
      wbsElement: { include: { projectLead: true, projectManager: true } },
      expectedActivities: true,
      deliverables: true
    }
  });
  return buildSuccessResponse(
    workPackages.map((val) => {
      const endDate = new Date(val.startDate);
      endDate.setDate(endDate.getDate() + val.duration * 7);
      return {
        ...val,
        ...val.wbsElement,
        endDate,
        wbsNumber: {
          car: val.wbsElement.carNumber,
          project: val.wbsElement.projectNumber,
          workPackage: val.wbsElement.workPackageNumber
        }
      };
    })
  );
};

// Fetch the work package for the specified WBS number
const getSingleWorkPackage: ApiRouteFunction = async (params: { wbs: string }) => {
  const parsedWbs: WbsNumber = validateWBS(params.wbs);
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
    include: {
      workPackage: { include: { expectedActivities: true, deliverables: true } },
      projectLead: true,
      projectManager: true
    }
  });
  if (wbsEle === null) {
    return buildNotFoundResponse('work package', `WBS # ${params.wbs}`);
  }
  const endDate = new Date(wbsEle!.workPackage!.startDate);
  endDate.setDate(endDate.getDate() + wbsEle!.workPackage!.duration * 7);
  return buildSuccessResponse({
    ...wbsEle!,
    ...wbsEle!.workPackage,
    endDate,
    wbsNumber: {
      car: wbsEle!.carNumber,
      project: wbsEle!.projectNumber,
      workPackage: wbsEle!.workPackageNumber
    }
  });
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
  } catch (error) {
    console.error(error);
    return buildServerFailureResponse(error.message);
  }
};

export { handler };
