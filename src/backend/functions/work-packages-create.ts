
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { Handler } from 'aws-lambda';
import { PrismaClient, WBS_Element_Status } from '@prisma/client';
import {
  buildSuccessResponse,
} from 'utils';

const prisma = new PrismaClient();

const createWorkPackage: Handler = async ({ body }, _context) => {
  
    // get the corresponding project so we can find the next wbs number
    // and what number work package this should be
    const project = await prisma.project.findUnique({
      where: {
        projectId: body.projectId
      },
      include: {
        goals: true,
        features: true,
        otherConstraints: true,
        workPackages: { include: { wbsElement: true, dependencies: true } }
      }
    });
  
    if (project === null) throw new TypeError('Project Id not found!');
  
    const {workPackages} = project;
    const {length} = workPackages;
    const orderInProject = length;
    // eslint-disable-next-line prefer-destructuring
    const last = workPackages[length - 1];
    const { wbsElement } = last;
    const { carNumber, projectNumber, workPackageNumber } = wbsElement; 
  
    const dependencies = [];
    for (const n of body.wbsElementIds) {
      dependencies.push({"wbsElementId":n});
    }
  
    const expectedActivities = [];
    for (const w of body.expectedActivities) {
      expectedActivities.push({"detail":w});
    }
  
    const deliverables = [];
    for (const d of body.deliverables) {
      deliverables.push({"detail":d});
    }
  
    // add to the database
    const created = await prisma.work_Package.create({
      data: {
        wbsElement: { create: { 
          carNumber,
          projectNumber,
          workPackageNumber: workPackageNumber + 1,
          name: body.name,
          status: WBS_Element_Status.ACTIVE
          }
        },
        project: { connect: { 
          projectId: body.projectId 
          } 
        },
        startDate: body.startDate,
        duration: body.duration,
        orderInProject,
        dependencies: { connect: dependencies },
        expectedActivities: { create: expectedActivities},
        deliverables: { create: deliverables}
      },
    });


    // TODO: I think I need to add the work package to the list of work packages for the corresponding project but this doesn't work
    // because of type issues and I'm not totally sure why

    // workPackages.push(created);

    // await prisma.project.update({
    //     where: {
    //       projectId: body.projectId,
    //     },
    //     data: {
    //         workPackages
    //     }
    // });
  
    return buildSuccessResponse(created)
}

const inputSchema = {
    type: 'object',
    properties: {
        body: {
            type:'object',
            properties: {
                userId: { type: 'number', minimum: 0 },
                name: { type: 'string' },
                projectId: { type: 'number', minimum: 0} ,
                startDate: { type: 'date' },
                duration: { type: 'number', minimum: 0 },
                wbsElementIds: { type: 'number[]', minLength: 0 },
                expectedActivities: { type: 'number[]', minLength: 0 } ,
                deliverables: { type: 'number[]', minLength: 0 }
            },
            required: ['userId', 'name', 'projectId', 'startDate', 'duration', 'wbsElementIds', 'expectedActivities', 'deliverables'],
        },
    }
};


const handler = middy(createWorkPackage)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());

export { handler };
  

