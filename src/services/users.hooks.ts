/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useQuery, useMutation } from 'react-query';
import { User } from '@prisma/client';
import { getAllUsers, getSingleUser, logUserIn } from './users.api';

/**
 * Custom React Hook to supply all users.
 */
export const useAllUsers = () => {
  return useQuery<User[], Error>('users', async () => {
    const { data } = await getAllUsers();
    return data;
  });
};

/**
 * Custom React Hook to supply a single user.
 *
 * @param id User ID of the requested user.
 */
export const useSingleUser = (id: number) => {
  return useQuery<User, Error>(['user', id], async () => {
    const { data } = await getSingleUser(id);
    return data;
  });
};

/**
 * Custom React Hook to log a user in.
 */
export const useLogUserIn = () => {
  return useMutation<User, Error, string>(['login'], async (id_token: string) => {
    const { data } = await logUserIn(id_token);
    return data;
  });
};
