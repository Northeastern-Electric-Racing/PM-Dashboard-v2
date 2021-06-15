/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { renderHook } from '@testing-library/react-hooks';
import { AxiosResponse } from 'axios';
import { User } from 'utils';
import { queryClientProvdierWrapper as wrapper } from '../../../test-support/test-utils';
import { mockPromiseAxiosResponse } from '../../../test-support/test-data/test-utils.stub';
import { exampleAllUsers, exampleAdminUser } from '../../../test-support/test-data/users.stub';
import { getAllUsers, getSingleUser } from '../../apis/users.api';
import { useAllUsers, useSingleUser } from '../users.hooks';

jest.mock('../../apis/users.api');

describe('user hooks', () => {
  it('handles getting a list of users', async () => {
    const mockedGetAllUsers = getAllUsers as jest.Mock<Promise<AxiosResponse<User[]>>>;
    mockedGetAllUsers.mockReturnValue(mockPromiseAxiosResponse<User[]>(exampleAllUsers));

    const { result, waitFor } = renderHook(() => useAllUsers(), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(exampleAllUsers);
  });

  it('handles getting a single user', async () => {
    const mockedGetSingleUser = getSingleUser as jest.Mock<Promise<AxiosResponse<User>>>;
    mockedGetSingleUser.mockReturnValue(mockPromiseAxiosResponse<User>(exampleAdminUser));

    const { result, waitFor } = renderHook(() => useSingleUser(1), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(exampleAdminUser);
  });

  it.todo('handles logging in a user');
});
