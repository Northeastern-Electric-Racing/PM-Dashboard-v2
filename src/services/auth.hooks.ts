/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState, useContext } from 'react';
import { User } from 'utils';
import { AuthContext } from '../components/app/app-context/app-context';
import { TEST_USER, exampleAdminUser } from '../test-support/test-data/users.stub';
import { useLogUserIn } from './users.hooks';

export interface Auth {
  user: User;
  devSignin: (user: User) => User;
  signin: (token: string) => Promise<User>;
  signout: () => void;
}

// Provider hook that creates auth object and handles state
export const useProvideAuth = () => {
  const serverSignin = useLogUserIn();
  const [user, setUser] = useState<User>(TEST_USER);

  const devSignin = (user: User) => {
    setUser(user);
    return user;
  };

  const signin = async (id_token: string) => {
    const user = await serverSignin.mutateAsync(id_token);
    setUser(user);
    return user;
  };

  const signout = () => {
    setUser(TEST_USER);
  };

  return {
    user,
    devSignin,
    signin,
    signout
  };
};

// Hook for child components to get the auth object
export const useAuth = () => {
  return useContext<Auth | undefined>(AuthContext!);
};
