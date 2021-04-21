/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from './user-types';
import { WbsNumber } from './wbs-types';

export interface ImplementedChange {
  id: number;
  crId: number;
  implementer: User;
  type: ImplementedChangeType;
  projectWbsNum: WbsNumber;
}

export enum ImplementedChangeType {
  AddProject = 'Add Project',
  AddWorkPackage = 'Add WP',
  DeleteProject = 'Delete Project',
  DeleteWorkPackage = 'Delete WP'
}
