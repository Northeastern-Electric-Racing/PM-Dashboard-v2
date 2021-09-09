/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
import {
  routeMatcher,
  ApiRoute,
  WbsNumber,
  ApiRouteFunction,
  API_URL,
  buildSuccessResponse,
  buildNotFoundResponse,
  buildServerFailureResponse,
  buildClientFailureResponse,
  validateWBS,
  isProject
} from 'utils';

const prisma = new PrismaClient();

// Fetch all projects
const getAllProjects: ApiRouteFunction = async () => {
  const projects = await prisma.project.findMany({
    include: {
      wbsElement: {
        include: { projectLead: true, projectManager: true }
      },
      workPackages: {
        select: { startDate: true, duration: true }
      }
    }
  });
  return buildSuccessResponse(
    projects.map((prj) => {
      return {
        ...prj,
        ...prj.wbsElement,
        wbsNum: {
          car: prj.wbsElement.carNumber,
          project: prj.wbsElement.projectNumber,
          workPackage: prj.wbsElement.workPackageNumber
        },
        duration: prj.workPackages.reduce((prev, curr) => prev + curr.duration, 0)
      };
    })
  );
};

// Fetch the project for the specified WBS number
const getSingleProject: ApiRouteFunction = async (params: { wbs: string }) => {
  const parsedWbs: WbsNumber = validateWBS(params.wbs);
  if (!isProject(parsedWbs)) {
    return buildClientFailureResponse('WBS Number is a Work Package WBS#, not a Project WBS#');
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
      project: {
        include: { goals: true, features: true, otherConstraints: true, workPackages: true }
      },
      projectLead: true,
      projectManager: true
    }
  });
  if (wbsEle === null) {
    return buildNotFoundResponse('project', `WBS # ${params.wbs}`);
  }
  let endDate = new Date(wbsEle!.project?.workPackages[0].startDate!);
  for (const wp of wbsEle!.project?.workPackages!) {
    const wpEnd = new Date(wp.startDate);
    wpEnd.setDate(wpEnd.getDate() + wp.duration * 7);
    if (wpEnd > endDate) {
      endDate = wpEnd;
    }
  }
  return buildSuccessResponse({
    ...wbsEle!,
    ...wbsEle!.project,
    endDate,
    wbsNumber: {
      car: wbsEle!.carNumber,
      project: wbsEle!.projectNumber,
      workPackage: wbsEle!.workPackageNumber
    }
  });
};

const routes: ApiRoute[] = [
  {
    path: `${API_URL}/projects`,
    httpMethod: 'GET',
    func: getAllProjects
  },
  {
    path: `${API_URL}/projects/:wbs`,
    httpMethod: 'GET',
    func: getSingleProject
  }
];

// Handler for incoming requests
const handler: Handler = async (event, context) => {
  try {
    const out = routeMatcher(routes, event, context);
    await prisma.$disconnect();
    return out;
  } catch (error) {
    console.error(error);
    return buildServerFailureResponse(error.message);
  }
};

export { handler };
