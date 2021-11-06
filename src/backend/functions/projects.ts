/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
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
  isProject,
  Project,
  WbsElementStatus,
  DescriptionBullet
} from 'utils';

const prisma = new PrismaClient();

const manyRelationArgs = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    wbsElement: {
      include: {
        projectLead: true,
        projectManager: true,
        changes: { include: { implementer: true } }
      }
    },
    goals: true,
    features: true,
    otherConstraints: true,
    workPackages: { include: { wbsElement: true, dependencies: true } }
  }
});

const uniqueRelationArgs = Prisma.validator<Prisma.WBS_ElementArgs>()({
  include: {
    project: {
      include: {
        goals: true,
        features: true,
        otherConstraints: true,
        workPackages: { include: { wbsElement: true, dependencies: true } }
      }
    },
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

const descBulletConverter = (descBullet: Description_Bullet): DescriptionBullet => ({
  ...descBullet,
  id: descBullet.descriptionId,
  dateDeleted: descBullet.dateDeleted ?? undefined
});

const projectTransformer = (
  payload:
    | Prisma.ProjectGetPayload<typeof manyRelationArgs>
    | Prisma.WBS_ElementGetPayload<typeof uniqueRelationArgs>
): Project => {
  if (payload === null) throw new TypeError('WBS_Element not found');
  const wbsElement = 'wbsElement' in payload ? payload.wbsElement : payload;
  const project = 'project' in payload ? payload.project! : payload;
  const wbsNum = wbsNumOf(wbsElement);

  return {
    ...project,
    ...wbsElement,
    id: project.projectId,
    projectManager: wbsElement.projectManager ?? undefined,
    projectLead: wbsElement.projectLead ?? undefined,
    status: convertStatus(wbsElement.status),
    changes: wbsElement.changes.map((change) => ({
      ...change,
      wbsNum
    })),
    wbsNum,
    gDriveLink: project.googleDriveFolderLink ?? undefined,
    slideDeckLink: project.slideDeckLink ?? undefined,
    taskListLink: project.taskListLink ?? undefined,
    bomLink: project.bomLink ?? undefined,
    otherConstraints: project.otherConstraints.map(descBulletConverter),
    features: project.features.map(descBulletConverter),
    goals: project.goals.map(descBulletConverter),
    duration: project.workPackages.reduce((prev, curr) => prev + curr.duration, 0),
    workPackages: project.workPackages.map((workPackage) => {
      const endDate = new Date(workPackage.startDate);
      endDate.setDate(workPackage.duration * 7);

      return {
        ...workPackage,
        ...workPackage.wbsElement,
        id: workPackage.workPackageId,
        wbsNum: wbsNumOf(workPackage.wbsElement),
        endDate,
        dependencies: workPackage.dependencies.map(wbsNumOf)
      };
    })
  };
};

// Fetch all projects
const getAllProjects: ApiRouteFunction = async () => {
  const projects = await prisma.project.findMany(manyRelationArgs);
  return buildSuccessResponse(projects.map(projectTransformer));
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
    ...uniqueRelationArgs
  });
  if (wbsEle === null) {
    return buildNotFoundResponse('project', `WBS # ${params.wbs}`);
  }

  return buildSuccessResponse(projectTransformer(wbsEle));
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
