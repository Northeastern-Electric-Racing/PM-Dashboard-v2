/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { User } from '@prisma/client';
import { apiUrls } from '../shared/urls';
import { userTransformer } from './transformers/users.transformers';

/**
 * Fetches all users.
 */
export const getAllUsers = () => {
  return axios.get<User[]>(apiUrls.users(), {
    transformResponse: (data) => JSON.parse(data).map(userTransformer)
  });
};

/**
 * Fetch a single user.
 *
 * @param id User ID of the requested user.
 */
export const getSingleUser = (id: number) => {
  return axios.get<User>(apiUrls.usersById(`${id}`), {
    transformResponse: (data) => userTransformer(JSON.parse(data))
  });
};

/**
 * Log in a user.
 *
 * @param id_token The login token for the user.
 */
export const logUserIn = (id_token: string) => {
  return axios.post<User>(
    apiUrls.usersLogin(),
    { id_token },
    { transformResponse: (data) => userTransformer(JSON.parse(data)) }
  );
};
