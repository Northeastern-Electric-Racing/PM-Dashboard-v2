/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { Prisma, PrismaClient, WBS_Element } from '@prisma/client';
import {
  ApiRoute,
  ApiRouteFunction,
  apiRoutes,
  API_URL,
  buildClientFailureResponse,
  buildServerFailureResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  routeMatcher,
  User,
  Risk,
  WbsNumber
} from 'utils';

const prisma = new PrismaClient();

const wbsNumOf = (element: WBS_Element): WbsNumber => ({
  carNumber: element.carNumber,
  projectNumber: element.projectNumber,
  workPackageNumber: element.workPackageNumber
});

const riskQueryArgs = Prisma.validator<Prisma.RiskArgs>()({
  include: {
    project: { include: { wbsElement: true } },
    createdBy: true,
    resolvedBy: true,
    deletedBy: true
  }
});

const riskTransformer = (risk: Prisma.RiskGetPayload<typeof riskQueryArgs>): Risk => {
  return {
    id: risk.id,
    project: {
      id: risk.project.projectId,
      name: risk.project.wbsElement.name,
      wbsNum: wbsNumOf(risk.project.wbsElement)
    },
    detail: risk.detail,
    isResolved: risk.isResolved,
    dateCreated: risk.dateCreated,
    createdBy: {
      userId: risk.createdBy.userId,
      firstName: risk.createdBy.firstName,
      lastName: risk.createdBy.lastName,
      email: risk.createdBy.email,
      role: risk.createdBy.role
    }
  };
};

const getRisksForProject: ApiRouteFunction = async (params: { projectId: string }) => {
  const projectId = parseInt(params.projectId);
  const requestedProject = await prisma.project.findUnique({
    where: { projectId }
  });

  if (!requestedProject) return buildNotFoundResponse('project', `#${projectId}`);

  const risks = await prisma.risk.findMany({
    where: { projectId },
    ...riskQueryArgs
  });

  return buildSuccessResponse(risks.map(riskTransformer));
};

// Define all valid routes for the endpoint
const routes: ApiRoute[] = [
  {
    path: `${API_URL}${apiRoutes.RISKS_BY_PROJECT}`,
    httpMethod: 'GET',
    func: getRisksForProject
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
