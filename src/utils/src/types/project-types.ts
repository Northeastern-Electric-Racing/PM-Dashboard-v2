/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from './user-types';
import { ImplementedChange } from './change-request-types';

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
  projectLead: User;
  projectManager: User;
  changes: ImplementedChange[];
}

export enum WbsElementStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Complete = 'Complete'
}

export interface Project extends WbsElement {
  summary: string;
  budget: number;
  gDriveLink: string;
  taskListLink: string;
  slideDeckLink: string;
  bomLink: string;
  rules: string[];
  goals: DescriptionBullet[];
  features: DescriptionBullet[];
  otherConstraints: DescriptionBullet[];
  workPackages: WorkPackage[];
}

export interface WorkPackage extends WbsElement {
  order: number;
  progress: number;
  startDate: Date;
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
