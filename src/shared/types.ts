/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from '@prisma/client';

export interface Auth {
  user: User | undefined;
  devSignin: (user: User) => User;
  signin: (token: string) => Promise<User>;
  signout: () => void;
}

export interface Theme {
  toggleTheme?: (theme: Theme) => void;
  themeName: string;
  bgColor: string;
  cardBg: string;
  cardBorder: string;
}
