/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ProjectPreview } from './project-types';
import { User } from './user-types';

export interface Team {
  teamId: number;
  teamName: string;
  leader: User;
  members: User[];
  projects: ProjectPreview[];
}
