/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { Prisma, PrismaClient, WBS_Element } from '@prisma/client';
import {
  ApiRoute,
  ApiRouteFunction,
  apiRoutes,
  API_URL,
  buildServerFailureResponse,
  buildSuccessResponse,
  routeMatcher,
  Team,
  WbsNumber
} from 'utils';

const prisma = new PrismaClient();

const relationArgs = Prisma.validator<Prisma.TeamArgs>()({
  include: {
    members: true,
    leader: true,
    projects: {
      include: {
        wbsElement: true
      }
    }
  }
});

const wbsNumOf = (element: WBS_Element): WbsNumber => ({
  carNumber: element.carNumber,
  projectNumber: element.projectNumber,
  workPackageNumber: element.workPackageNumber
});

const teamsTransformer = (team: Prisma.TeamGetPayload<typeof relationArgs>): Team => {
  if (team === null) throw new TypeError('Team not found');

  return {
    teamId: team.teamId,
    teamName: team.teamName,
    slackId: team.slackId,
    description: team.description,
    leader: team.leader,
    members: team.members,
    projects: team.projects.map((project) => ({
      id: project.projectId,
      wbsNum: wbsNumOf(project.wbsElement),
      name: project.wbsElement.name
    }))
  };
};

// Fetch all teams
const getAllTeams: ApiRouteFunction = async () => {
  const teams = await prisma.team.findMany(relationArgs);
  return buildSuccessResponse(teams.map(teamsTransformer));
};

// Define all valid routes for the endpoint
const routes: ApiRoute[] = [
  {
    path: `${API_URL}${apiRoutes.TEAMS}`,
    httpMethod: 'GET',
    func: getAllTeams
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
