/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Role, User } from 'utils';

export const exampleAppAdminUser: User = {
  id: 1,
  firstName: 'Thomas',
  lastName: 'Emrax',
  emailId: 'emrax.t',
  firstLogin: new Date('02/01/21'),
  lastLogin: new Date('03/04/21'),
  role: Role.AppAdmin
};

export const exampleAdminUser: User = {
  id: 2,
  firstName: 'Joe',
  lastName: 'Shmoe',
  emailId: 'shmoe.j',
  firstLogin: new Date('02/10/21'),
  lastLogin: new Date('02/25/21'),
  role: Role.Admin
};

export const exampleLeadershipUser: User = {
  id: 3,
  firstName: 'Joe',
  lastName: 'Blow',
  emailId: 'blow.j',
  firstLogin: new Date('02/25/21'),
  lastLogin: new Date('02/28/21'),
  role: Role.Leadership
};

export const exampleProjectLeadUser: User = {
  id: 4,
  firstName: 'Amy',
  lastName: 'Smith',
  emailId: 'smith.a',
  firstLogin: new Date('02/19/21'),
  lastLogin: new Date('03/12/21'),
  role: Role.ProjectLead
};

export const exampleProjectManagerUser: User = {
  id: 5,
  firstName: 'Rachel',
  lastName: 'Barmatha',
  emailId: 'barmatha.r',
  firstLogin: new Date('02/16/21'),
  lastLogin: new Date('02/19/21'),
  role: Role.ProjectManager
};

export const exampleMemberUser: User = {
  id: 6,
  firstName: 'Emily',
  lastName: 'Bendara',
  emailId: 'bendara.e',
  firstLogin: new Date('02/28/21'),
  lastLogin: new Date('03/03/21'),
  role: Role.Member
};

export const exampleGuestUser: User = {
  id: 7,
  firstName: 'Jackson',
  lastName: 'James',
  emailId: 'james.j',
  firstLogin: new Date('03/06/21'),
  lastLogin: new Date('03/06/21'),
  role: Role.Guest
};

export const exampleAllUsers: User[] = [
  exampleAppAdminUser,
  exampleAdminUser,
  exampleLeadershipUser,
  exampleProjectLeadUser,
  exampleProjectManagerUser,
  exampleMemberUser,
  exampleGuestUser
];
