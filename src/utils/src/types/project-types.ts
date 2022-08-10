/*
 * This file is part of NER's FinishLine by NERand licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from './user-types';
import { ImplementedChange } from './change-request-types';
import { TimelineStatus } from './work-package-types';
import { FromSchema } from 'json-schema-to-ts';
import { arrayType, bodySchema, enumType, intType, stringType } from './api-utils-types';
import { TeamPreview } from './team-types';

export interface WbsNumber {
  carNumber: number;
  projectNumber: number;
  workPackageNumber: number;
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
  team?: TeamPreview;
}

export type ProjectPreview = Pick<Project, 'id' | 'name' | 'wbsNum'>;

export interface WorkPackage extends WbsElement {
  orderInProject: number;
  progress: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  expectedProgress: number;
  timelineStatus: TimelineStatus;
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

export const createProjectPayloadSchema = bodySchema({
  userId: intType,
  crId: intType,
  name: stringType,
  carNumber: intType,
  summary: stringType
});

export type CreateProjectPayload = FromSchema<typeof createProjectPayloadSchema>;

export const projectEditInputSchemaBody = bodySchema(
  {
    projectId: intType,
    crId: intType,
    name: stringType,
    userId: intType,
    budget: intType,
    summary: stringType,
    rules: arrayType(stringType),
    goals: arrayType(bodySchema({ id: intType, detail: stringType }, ['id'])),
    features: arrayType(bodySchema({ id: intType, detail: stringType }, ['id'])),
    otherConstraints: arrayType(bodySchema({ id: intType, detail: stringType }, ['id'])),
    wbsElementStatus: enumType(
      WbsElementStatus.Active,
      WbsElementStatus.Inactive,
      WbsElementStatus.Complete
    ),
    googleDriveFolderLink: stringType,
    slideDeckLink: stringType,
    bomLink: stringType,
    taskListLink: stringType,
    projectLead: intType,
    projectManager: intType
  },
  [
    'googleDriveFolderLink',
    'slideDeckLink',
    'bomLink',
    'taskListLink',
    'projectLead',
    'projectManager'
  ]
);

export type EditProjectPayload = FromSchema<typeof projectEditInputSchemaBody>;
