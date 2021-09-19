/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  googleAuthId: string;
  email: string;
  emailId: string | null;
  role: Role;
}

export type Role = 'APP_ADMIN' | 'ADMIN' | 'LEADERSHIP' | 'MEMBER' | 'GUEST';
