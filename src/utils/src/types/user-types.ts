/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
  role: Role;
}

export enum Role {
  AppAdmin = 'App Admin',
  Admin = 'Admin',
  Leadership = 'Leadership',
  ProjectManager = 'Project Manager',
  ProjectLead = 'Project Lead',
  Member = 'Member',
  Guest = 'Guest'
}
