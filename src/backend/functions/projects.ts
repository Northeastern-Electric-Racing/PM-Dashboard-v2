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
  apiRoutes,
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
  DescriptionBullet,
  calculateEndDate,
  calculatePercentExpectedProgress,
  calculateTimelineStatus
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
    workPackages: {
      include: {
        wbsElement: {
          include: {
            projectLead: true,
            projectManager: true,
            changes: { include: { implementer: true } }
          }
        },
        dependencies: true,
        expectedActivities: true,
        deliverables: true
      }
    }
  }
});

const uniqueRelationArgs = Prisma.validator<Prisma.WBS_ElementArgs>()({
  include: {
    project: {
      include: {
        goals: true,
        features: true,
        otherConstraints: true,
        workPackages: {
          include: {
            wbsElement: {
              include: {
                projectLead: true,
                projectManager: true,
                changes: { include: { implementer: true } }
              }
            },
            dependencies: true,
            expectedActivities: true,
            deliverables: true
          }
        }
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
  carNumber: element.carNumber,
  projectNumber: element.projectNumber,
  workPackageNumber: element.workPackageNumber
});

export const descBulletConverter = (descBullet: Description_Bullet): DescriptionBullet => ({
  id: descBullet.descriptionId,
  detail: descBullet.detail,
  dateAdded: descBullet.dateAdded,
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
    id: project.projectId,
    wbsNum,
    dateCreated: wbsElement.dateCreated,
    name: wbsElement.name,
    status: convertStatus(wbsElement.status),
    projectLead: wbsElement.projectLead ?? undefined,
    projectManager: wbsElement.projectManager ?? undefined,
    changes: wbsElement.changes.map((change) => ({
      changeId: change.changeId,
      changeRequestId: change.changeRequestId,
      wbsNum,
      implementer: change.implementer,
      detail: change.detail,
      dateImplemented: change.dateImplemented
    })),
    summary: project.summary,
    budget: project.budget,
    gDriveLink: project.googleDriveFolderLink ?? undefined,
    taskListLink: project.taskListLink ?? undefined,
    slideDeckLink: project.slideDeckLink ?? undefined,
    bomLink: project.bomLink ?? undefined,
    rules: project.rules,
    duration: project.workPackages.reduce((prev, curr) => prev + curr.duration, 0),
    goals: project.goals.map(descBulletConverter),
    features: project.features.map(descBulletConverter),
    otherConstraints: project.otherConstraints.map(descBulletConverter),
    workPackages: project.workPackages.map((workPackage) => {
      const endDate = calculateEndDate(workPackage.startDate, workPackage.duration);
      const expectedProgress = calculatePercentExpectedProgress(
        workPackage.startDate,
        workPackage.duration,
        wbsElement.status
      );

      return {
        id: workPackage.workPackageId,
        wbsNum: wbsNumOf(workPackage.wbsElement),
        dateCreated: workPackage.wbsElement.dateCreated,
        name: workPackage.wbsElement.name,
        status: convertStatus(workPackage.wbsElement.status),
        projectLead: workPackage.wbsElement.projectLead ?? undefined,
        projectManager: workPackage.wbsElement.projectManager ?? undefined,
        changes: workPackage.wbsElement.changes.map((change) => ({
          changeId: change.changeId,
          changeRequestId: change.changeRequestId,
          wbsNum: wbsNumOf(workPackage.wbsElement),
          implementer: change.implementer,
          detail: change.detail,
          dateImplemented: change.dateImplemented
        })),
        orderInProject: workPackage.orderInProject,
        progress: workPackage.progress,
        startDate: workPackage.startDate,
        endDate,
        duration: workPackage.duration,
        expectedProgress,
        timelineStatus: calculateTimelineStatus(workPackage.progress, expectedProgress),
        dependencies: workPackage.dependencies.map(wbsNumOf),
        expectedActivities: workPackage.expectedActivities.map(descBulletConverter),
        deliverables: workPackage.deliverables.map(descBulletConverter)
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
const getSingleProject: ApiRouteFunction = async (params: { wbsNum: string }) => {
  const parsedWbs: WbsNumber = validateWBS(params.wbsNum);
  if (!isProject(parsedWbs)) {
    return buildClientFailureResponse('WBS Number is a Work Package WBS#, not a Project WBS#');
  }
  const wbsEle = await prisma.wBS_Element.findUnique({
    where: {
      wbsNumber: {
        carNumber: parsedWbs.carNumber,
        projectNumber: parsedWbs.projectNumber,
        workPackageNumber: parsedWbs.workPackageNumber
      }
    },
    ...uniqueRelationArgs
  });
  if (wbsEle === null) {
    return buildNotFoundResponse('project', `WBS # ${params.wbsNum}`);
  }

  return buildSuccessResponse(projectTransformer(wbsEle));
};

const routes: ApiRoute[] = [
  {
    path: API_URL + apiRoutes.PROJECTS,
    httpMethod: 'GET',
    func: getAllProjects
  },
  {
    path: API_URL + apiRoutes.PROJECTS_BY_WBS,
    httpMethod: 'GET',
    func: getSingleProject
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
