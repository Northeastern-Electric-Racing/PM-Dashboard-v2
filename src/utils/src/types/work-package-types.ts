/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';

export const workPackageInputSchemaBody = {
  type: 'object',
  properties: {
    userId: { type: 'integer', minimum: 0 },
    name: { type: 'string' },
    crId: { type: 'integer', minimum: 0 },
    projectId: { type: 'number', minimum: 0 },
    startDate: { type: 'string', format: 'date' },
    duration: { type: 'number', minimum: 0 },
    wbsElementIds: {
      type: 'array',
      items: {
        type: 'number',
        minimum: 0
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
    'projectId',
    'startDate',
    'duration',
    'wbsElementIds',
    'expectedActivities',
    'deliverables'
  ]
} as const;

export type CreateWorkPackagePayload = FromSchema<typeof workPackageInputSchemaBody>;