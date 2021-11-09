/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from 'utils/src';

export interface Auth {
  user: User | undefined;
  devSignin: (user: User) => User;
  signin: (token: string) => Promise<User>;
  signout: () => void;
}
