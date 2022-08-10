/*
 * This file is part of NER's FinishLine by NERand licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from 'utils';
import { Role } from '@prisma/client';

export const exampleAppAdminUser: User = {
  userId: 1,
  firstName: 'Thomas',
  lastName: 'Emrax',
  googleAuthId: '1',
  email: 'emrax.t@husky.neu.edu',
  emailId: 'emrax.t',
  role: Role.APP_ADMIN
};

export const exampleAdminUser: User = {
  userId: 2,
  firstName: 'Joe',
  lastName: 'Shmoe',
  googleAuthId: '2',
  email: 'shmoe.j@husky.neu.edu',
  emailId: 'shmoe.j',
  role: Role.ADMIN
};

export const exampleAdminUser2: User = {
  userId: 3,
  firstName: 'Joe',
  lastName: 'Shmoe',
  googleAuthId: '2',
  email: 'shmoe.j@husky.neu.edu',
  emailId: 'shmoe.j',
  role: Role.ADMIN
};

export const exampleLeadershipUser: User = {
  userId: 3,
  firstName: 'Joe',
  lastName: 'Blow',
  googleAuthId: '3',
  email: 'blow.j@husky.neu.edu',
  emailId: 'blow.j',
  role: Role.LEADERSHIP
};

export const exampleProjectLeadUser: User = {
  userId: 4,
  firstName: 'Amy',
  lastName: 'Smith',
  googleAuthId: '4',
  email: 'smith.a@husky.neu.edu',
  emailId: 'smith.a',
  role: Role.LEADERSHIP
};

export const exampleProjectManagerUser: User = {
  userId: 5,
  firstName: 'Rachel',
  lastName: 'Barmatha',
  googleAuthId: '5',
  email: 'barmatha.r@husky.neu.edu',
  emailId: 'barmatha.r',
  role: Role.MEMBER
};

export const exampleMemberUser: User = {
  userId: 6,
  firstName: 'Emily',
  lastName: 'Bendara',
  googleAuthId: '6',
  email: 'bendara.e@husky.neu.edu',
  emailId: 'bendara.e',
  role: Role.MEMBER
};

export const exampleGuestUser: User = {
  userId: 7,
  firstName: 'Jackson',
  lastName: 'James',
  googleAuthId: '7',
  email: 'james.j@husky.neu.edu',
  emailId: 'james.j',
  role: Role.GUEST
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
