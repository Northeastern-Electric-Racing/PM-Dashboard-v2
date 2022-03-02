/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from './user-types';
import { ImplementedChange } from './change-request-types';
import { FromSchema } from 'json-schema-to-ts';

export interface WbsNumber {
  car: number;
  project: number;
  workPackage: number;
}

export interface WbsElement {
  id: number;
  wbsNum: WbsNumber;
  dateCreated: Date;
  name: string;
  status: WbsElementStatus;
  projectLead?: User;
  projectManager?: User;
  changes: ImplementedChange[];
}

export enum WbsElementStatus {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE',
  Complete = 'COMPLETE'
}

export interface Project extends WbsElement {
  summary: string;
  budget: number;
  gDriveLink?: string;
  taskListLink?: string;
  slideDeckLink?: string;
  bomLink?: string;
  rules: string[];
  duration: number;
  goals: DescriptionBullet[];
  features: DescriptionBullet[];
  otherConstraints: DescriptionBullet[];
  workPackages: WorkPackage[];
}

export interface WorkPackage extends WbsElement {
  orderInProject: number;
  progress: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  dependencies: WbsNumber[];
  expectedActivities: DescriptionBullet[];
  deliverables: DescriptionBullet[];
}

export interface DescriptionBullet {
  id: number;
  detail: string;
  dateAdded: Date;
  dateDeleted?: Date;
}

export const createProjectPayloadSchema = {
  type: 'object',
  properties: {
    userId: { type: 'integer', minimum: 0 },
    crId: { type: 'integer', minimum: 0 },
    name: { type: 'string' },
    carNumber: { type: 'integer', minimum: 0 },
    summary: { type: 'string' }
  },
  required: ['userId', 'crId', 'name', 'carNumber', 'summary'],
  additionalProperties: false
} as const;

export type CreateProjectPayload = FromSchema<typeof createProjectPayloadSchema>;

// NOT DONE TODO: Finish
export const projectEditInputSchemaBody = {
  type: 'object',
  properties: {
    wbsElementId: { type: 'integer', minimum: 0 },
    crId: { type: 'integer', minimum: 0 },
    name: { type: 'string' },
    userId: { type: 'integer', minimum: 0 },
    budget: { type: 'integer', minimum: 0 },
    summary: { type: 'string' },
    rules: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    goals: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', minimum: 0 },
          detail: { type: 'string' }
        },
        required: ['id', 'detail']
      }
    },
    features: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', minimum: 0 },
          detail: { type: 'string' }
        },
        required: ['id', 'detail']
      }
    },
    otherConstraints: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', minimum: 0 },
          detail: { type: 'string' }
        },
        required: ['id', 'detail']
      }
    },
    wbsElementStatus: {
      type: 'string',
      enum: ['INACTIVE', 'ACTIVE', 'COMPLETE']
    },
    googleDriveFolderLink: { type: 'string' },
    slideDeckLink: { type: 'string' },
    bomLink: { type: 'string' },
    taskListLink: { type: 'string' },
    projectLead: { type: 'integer', minimum: 0 },
    projectManager: { type: 'integer', minimum: 0 }
  },
  required: [
    'wbsElementId',
    'crId',
    'userId',
    'budget',
    'summary',
    'rules',
    'goals',
    'features',
    'otherConstraints',
    'name',
    'wbsElementStatus'
  ]
} as const;

export type EditProjectPayload = FromSchema<typeof projectEditInputSchemaBody>;
