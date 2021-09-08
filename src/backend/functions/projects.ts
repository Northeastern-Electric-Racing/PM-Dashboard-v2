/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
import {
  routeMatcher,
  ApiRoute,
  Project,
  WbsNumber,
  ApiRouteFunction,
  API_URL,
  buildSuccessResponse,
  buildNotFoundResponse,
  buildServerFailureResponse
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
const getSingleProject: ApiRouteFunction = (params: { wbs: string }) => {
  const parseWbs: number[] = params.wbs.split('.').map((str) => parseInt(str));
  const parsedWbs: WbsNumber = {
    car: parseWbs[0],
    project: parseWbs[1],
    workPackage: parseWbs[2]
  };
  const requestedProject: Project | undefined = exampleAllProjects.find((prj: Project) => {
    return (
      prj.wbsNum.car === parsedWbs.car &&
      prj.wbsNum.project === parsedWbs.project &&
      prj.wbsNum.workPackage === parsedWbs.workPackage
    );
  });
  if (requestedProject === undefined) {
    return buildNotFoundResponse('project', `WBS # ${params.wbs}`);
  }
  return buildSuccessResponse(requestedProject);
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
