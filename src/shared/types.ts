/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { AuthenticatedUser, User, Theme } from 'utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface Auth {
  user: AuthenticatedUser | undefined;
  devSignin: (user: User) => User;
  signin: (token: string) => Promise<AuthenticatedUser>;
  signout: () => void;
  isLoading: boolean;
}

export interface ThemeUtility {
  toggleTheme?: (name: string) => void;
  name: Theme;
  bgColor: string;
  cardBg: string;
  cardBorder: string;
}

export interface LinkItem {
  name: string;
  icon?: IconProp;
  route: string;
}
