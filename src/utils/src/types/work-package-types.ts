/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import { bodySchema, intType, stringType, dateType, arrayType, enumType } from './api-utils-types';
import { WbsElementStatus } from './project-types';

// <<<<<<< HEAD
export const workPackageCreateInputSchemaBody = {
  type: 'object',
  properties: {
    userId: { type: 'integer', minimum: 0 },
    name: { type: 'string' },
    crId: { type: 'integer', minimum: 0 },
    projectWbsNum: {
      type: 'object',
      properties: {
        carNumber: { type: 'integer', minimum: 0 },
        projectNumber: { type: 'integer', minimum: 0 },
        workPackageNumber: { type: 'integer', minimum: 0 },
      },
      required: ['carNumber', 'projectNumber', 'workPackageNumber']

    }, // convert this to wbs num 
    // break down into the 3 stuff
    startDate: { type: 'string', format: 'date' },
    duration: { type: 'integer', minimum: 0 },
    wbsElementIds: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          carNumber: { type: 'integer', minimum: 0 },
          projectNumber: { type: 'integer', minimum: 0 },
          workPackageNumber: { type: 'integer', minimum: 0 },
        },
        required: ['carNumber', 'projectNumber', 'workPackageNumber']
      }
    },
    expectedActivities: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 0
      }
    },
    deliverables: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 0
      }
    }
  },
  required: [
    'userId',
    'name',
    'crId',
    'projectWbsNum',
    'startDate',
    'duration',
    'wbsElementIds',
    'expectedActivities',
    'deliverables'
  ]
} as const;
// =======
// export const workPackageCreateInputSchemaBody = bodySchema({
//   userId: intType,
//   name: stringType,
//   crId: intType,
//   projectId: intType,
//   startDate: dateType,
//   duration: intType,
//   dependencies: arrayType(intType),
//   expectedActivities: arrayType(stringType),
//   deliverables: arrayType(stringType)
// });
// >>>>>>> daacad86adfe70f1230f8e9e5e7d2af1eca554b0

export type CreateWorkPackagePayload = FromSchema<typeof workPackageCreateInputSchemaBody>;

export const workPackageEditInputSchemaBody = bodySchema(
  {
    wbsElementId: intType,
    userId: intType,
    name: stringType,
    crId: intType,
    startDate: dateType,
    duration: intType,
    dependencies: arrayType(intType),
    expectedActivities: arrayType(bodySchema({ id: intType, detail: stringType })),
    deliverables: arrayType(bodySchema({ id: intType, detail: stringType })),
    wbsElementStatus: enumType(
      WbsElementStatus.Active,
      WbsElementStatus.Inactive,
      WbsElementStatus.Complete
    ),
    progress: intType,
    projectLead: intType,
    projectManager: intType
  },
  ['projectLead', 'projectManager']
);

export type EditWorkPackagePayload = FromSchema<typeof workPackageEditInputSchemaBody>;
