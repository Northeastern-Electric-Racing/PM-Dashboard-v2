/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from './user-types';
import { WbsNumber } from './wbs-types';

export interface WbsElement {
  id: number;
  wbsNum: WbsNumber;
  dateCreated: Date;
  name: string;
  status: WbsElementStatus;
  projectLead: User;
  projectManager: User;
}

export enum WbsElementStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Complete = 'Complete'
}

export interface Project extends WbsElement {
  gDriveLink: string;
  taskListLink: string;
  slideDeckLink: string;
  bomLink: string;
  workPackages: WorkPackage[];
}

export interface WorkPackage extends WbsElement {
  order: number;
  progress: number;
  startDate: Date;
  duration: number;
  budget: number;
  dependencies: WbsNumber[];
  deliverable: string;
  rules: string[];
  descriptionBullets: DescriptionBullet[];
}

export interface DescriptionBullet {
  id: number;
  detail: string;
  dateAdded: Date;
  dateDeleted?: Date;
  dateDone?: Date;
}
