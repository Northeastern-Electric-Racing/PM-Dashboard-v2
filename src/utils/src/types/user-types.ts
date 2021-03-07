/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
  firstLogin: Date;
  lastLogin: Date;
  role: Role;
}

export enum Role {
  AppAdmin,
  Admin,
  Leadership,
  ProjectManager,
  ProjectLead,
  Member,
  Guest
}
