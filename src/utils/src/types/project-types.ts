/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from './user-types';
import { ImplementedChange } from './change-request-types';
import { TimelineStatus } from './work-package-types';
import { FromSchema } from 'json-schema-to-ts';
import { bodySchema, intType, stringType } from './api-utils-types';

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
  duration: number;
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
<<<<<<< HEAD
=======
  duration: number;
  expectedProgress: number;
  timelineStatus: TimelineStatus;
>>>>>>> bcda2367c205458ef7a9bf1452d7b26cb60de154
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
