/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Role } from '@prisma/client';

const dbSeedAppAdminUser: any = {
  firstName: 'Thomas',
  lastName: 'Emrax',
  emailId: 'emrax.t',
  firstLogin: new Date('02/01/21'),
  lastLogin: new Date('03/04/21'),
  role: Role.APP_ADMIN
};

const dbSeedAdminUser: any = {
  firstName: 'Joe',
  lastName: 'Shmoe',
  emailId: 'shmoe.j',
  firstLogin: new Date('02/10/21'),
  lastLogin: new Date('02/25/21'),
  role: Role.ADMIN
};

const dbSeedLeadershipUser: any = {
  firstName: 'Joe',
  lastName: 'Blow',
  emailId: 'blow.j',
  firstLogin: new Date('02/25/21'),
  lastLogin: new Date('02/28/21'),
  role: Role.LEADERSHIP
};

const dbSeedProjectLeadUser: any = {
  firstName: 'Amy',
  lastName: 'Smith',
  emailId: 'smith.a',
  firstLogin: new Date('02/19/21'),
  lastLogin: new Date('03/12/21'),
  role: Role.PROJECT_LEAD
};

const dbSeedProjectManagerUser: any = {
  firstName: 'Rachel',
  lastName: 'Barmatha',
  emailId: 'barmatha.r',
  lastLogin: new Date('02/19/21'),
  role: Role.PROJECT_MANAGER
};

const dbSeedMemberUser: any = {
  firstName: 'Emily',
  lastName: 'Bendara',
  emailId: 'bendara.e',
  firstLogin: new Date('02/28/21'),
  role: Role.MEMBER
};

const dbSeedGuestUser: any = {
  firstName: 'Jackson',
  lastName: 'James',
  emailId: 'james.j'
};

export const dbSeedAllUsers: any[] = [
  dbSeedAppAdminUser,
  dbSeedAdminUser,
  dbSeedLeadershipUser,
  dbSeedProjectLeadUser,
  dbSeedProjectManagerUser,
  dbSeedMemberUser,
  dbSeedGuestUser
];
