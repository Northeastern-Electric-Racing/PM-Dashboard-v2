/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import {
  Change,
  Description_Bullet,
  Prisma,
  PrismaClient,
  WBS_Element,
  WBS_Element_Status,
  Work_Package
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
  User
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
        wbsElement: { include: { changes: { include: { implementer: true } } } },
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
            wbsElement: { include: { changes: { include: { implementer: true } } } },
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
  car: element.carNumber,
  project: element.projectNumber,
  workPackage: element.workPackageNumber
});

export const descBulletConverter = (descBullet: Description_Bullet): DescriptionBullet => ({
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
    //duration: project.workPackages.reduce((prev, curr) => prev + curr.duration, 0),
    duration: calculateDuration(project.workPackages),
    workPackages: project.workPackages.map((workPackage) => {
      const endDate = new Date(workPackage.startDate);
      endDate.setDate(workPackage.duration * 7);

      return {
        ...workPackage,
        ...workPackage.wbsElement,
        id: workPackage.workPackageId,
        wbsNum: wbsNumOf(workPackage.wbsElement),
        status: convertStatus(workPackage.wbsElement.status),
        endDate,
        dependencies: workPackage.dependencies.map(wbsNumOf),
        expectedActivities: workPackage.expectedActivities.map(descBulletConverter),
        deliverables: workPackage.deliverables.map(descBulletConverter),
        changes: workPackage.wbsElement.changes.map((change) => ({
          ...change,
          wbsNum: wbsNumOf(workPackage.wbsElement)
        }))
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
        carNumber: parsedWbs.car,
        projectNumber: parsedWbs.project,
        workPackageNumber: parsedWbs.workPackage
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

// calculates duration
const calculateDuration = (
  workPackages: (Work_Package & {
    wbsElement: WBS_Element & {
      changes: (Change & {
        implementer: User;
      })[];
    };
    dependencies: WBS_Element[];
    expectedActivities: Description_Bullet[];
    deliverables: Description_Bullet[];
  })[]
) => {
  
  const startDates = workPackages.map((workPackage) => workPackage.startDate.getTime());
  
  // since endDate is not yet assigned, calculate an array of end dates
  // with information of start date and duration in each wp.
  const endDates: number[] = workPackages.map((workPackage) => {
    const endDate = new Date(workPackage.startDate);
    endDate.setDate(workPackage.duration * 7);
    return endDate.getTime();
  });

  const [earliestStartDate] = startDates.sort((prev, next) => prev - next);
  const [latestEndDate] = endDates.sort((prev, next) => next - prev);

  if (earliestStartDate == null) {
    return 0;
  }

  const durationInDays = (latestEndDate - earliestStartDate) / (60 * 60 * 24 * 1000);
  const duration = Math.round(durationInDays / 7);

  return duration;
};

export { handler };
