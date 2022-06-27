/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { Description_Bullet, Prisma, PrismaClient, WBS_Element } from '@prisma/client';
import {
  ApiRoute,
  ApiRouteFunction,
  apiRoutes,
  API_URL,
  buildServerFailureResponse,
  buildSuccessResponse,
  routeMatcher,
  Team,
  WbsNumber,
  DescriptionBullet
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

export const descBulletConverter = (descBullet: Description_Bullet): DescriptionBullet => ({
  ...descBullet,
  id: descBullet.descriptionId,
  dateDeleted: descBullet.dateDeleted ?? undefined
});

const teamsTransformer = (team: Prisma.TeamGetPayload<typeof relationArgs>): Team => {
  if (team === null) throw new TypeError('Team not found');

  return {
    teamId: team.teamId ?? undefined,
    teamName: team.teamName ?? undefined,
    leader: team.leader ?? undefined,
    members: team.members ?? undefined,
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

// make a team with the given leader and name
const createTeam: ApiRouteFunction = async (params: { leaderId: string; teamName: string }) => {
  const { teamName } = params;
  const leaderId: number = parseInt(params.leaderId);

  const team = await prisma.team.create({
    data: {
      teamName,
      leaderId
    },
    include: {
      members: true,
      projects: {
        include: {
          wbsElement: true
        }
      },
      leader: true
    }
  });

  return buildSuccessResponse(teamsTransformer(team));
};

// Define all valid routes for the endpoint
const routes: ApiRoute[] = [
  {
    path: `${API_URL}${apiRoutes.TEAMS}`,
    httpMethod: 'GET',
    func: getAllTeams
  },
  {
    path: `${API_URL}${apiRoutes.TEAMS}`,
    httpMethod: 'POST',
    func: createTeam
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
