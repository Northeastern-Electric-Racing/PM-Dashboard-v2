/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';
import { User } from 'utils';
import { apiUrls } from '../shared/urls';
import { useApiRequest } from './api-request';

/**
 * Transforms a user to ensure deep field transformation of date objects.
 *
 * @param user Incoming user object supplied by the HTTP response.
 * @returns Properly transformed user object.
 */
export const userTransformer = (user: User) => {
  return {
    ...user,
    firstLogin: new Date(user.firstLogin),
    lastLogin: new Date(user.lastLogin)
  };
};

/**
 * Custom React Hook to supply the API response containing all users.
 *
 * @returns All users, via useApiRequest Hook pattern.
 */
export const useAllUsers = () => {
  const config: AxiosRequestConfig = useMemo(() => ({ method: 'GET', url: apiUrls.users() }), []);
  const transformer = (response: User[]) => response.map(userTransformer);
  return useApiRequest<User[]>(config, transformer);
};

/**
 * Custom React Hook to supply the API response containing a single user.
 *
 * @param id User ID of the requested user.
 * @returns The requested user, via useApiRequest Hook pattern.
 */
export const useSingleUser = (id: number) => {
  const config: AxiosRequestConfig = useMemo(
    () => ({ method: 'GET', url: apiUrls.usersById(`${id}`) }),
    [id]
  );
  return useApiRequest<User>(config, userTransformer);
};
