/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import { apiUrls } from '../../shared/urls';
import {
  exampleAllChangeRequests,
  exampleStageGateChangeRequest
} from '../../test-support/test-data/change-requests.stub';
import { useAllChangeRequests, useSingleChangeRequest } from '../change-requests';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(apiUrls.changeRequests(), (req, res, ctx) => {
    return res(ctx.status(500, 'Mock server not set up yet'));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('change request hooks', () => {
  it('handles getting a list of change requests', async () => {
    server.use(
      rest.get(apiUrls.changeRequests(), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleAllChangeRequests));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAllChangeRequests());
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toHaveProperty('length', 3);
    expect(result.current.responseData![0]).toHaveProperty('type');
    expect(result.current.responseData![1]).toHaveProperty('dateSubmitted');
  });

  it('handles getting a single change request', async () => {
    server.use(
      rest.get(apiUrls.changeRequestsById('50'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleStageGateChangeRequest));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useSingleChangeRequest(50));
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).not.toHaveProperty('length');
    expect(result.current.responseData).toHaveProperty('confirmCompleted');
    expect(result.current.responseData).toHaveProperty('leftoverBudget');
  });
});
