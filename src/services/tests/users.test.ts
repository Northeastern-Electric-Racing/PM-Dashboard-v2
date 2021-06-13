/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import { apiUrls } from '../../shared/urls';
import { exampleAllUsers, exampleAdminUser } from '../../test-support/test-data/users.stub';
import { useAllUsers, useSingleUser } from '../users';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(apiUrls.users(), (req, res, ctx) => {
    return res(ctx.status(500, 'Mock server not set up yet'));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('user hooks', () => {
  it('handles getting a list of users', async () => {
    server.use(
      rest.get(apiUrls.users(), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleAllUsers));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAllUsers());
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toHaveProperty('length', 7);
    expect(result.current.responseData![0]).toHaveProperty('emailId');
    expect(result.current.responseData![1]).toHaveProperty('firstLogin');
  });

  it('handles getting a single user', async () => {
    server.use(
      rest.get(apiUrls.usersById('24'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleAdminUser));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useSingleUser(24));
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).not.toHaveProperty('length');
    expect(result.current.responseData).toHaveProperty('firstName');
    expect(result.current.responseData).toHaveProperty('role');
  });
});
