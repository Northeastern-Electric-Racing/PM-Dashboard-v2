/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import {
  apiRoutes,
  API_URL,
  ChangeRequest,
  exampleAllProjects,
  exampleProject1,
  exampleStandardChangeRequest,
  Project
} from 'utils';
import { useApiRequest } from '../api-request';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(API_URL + apiRoutes.CHANGE_REQUESTS, (req, res, ctx) => {
    return res(ctx.status(500, 'Mock server not set up yet'));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useApiRequest hook', () => {
  it('handles server responding with an error using status text', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest<ChangeRequest[]>({ method: 'GET', url: apiRoutes.CHANGE_REQUESTS }, (cr) => cr)
    );
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual(
      'API request error: Server responded with status code 500, Mock server not set up yet.'
    );
    expect(result.current.responseData).toBeUndefined();
  });

  it('handles server responding with an error using response body message', async () => {
    server.use(
      rest.get(API_URL + apiRoutes.CHANGE_REQUESTS + '/5', (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ message: 'Could not find the requested change request [#5].' })
        );
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest<ChangeRequest>(
        { method: 'GET', url: apiRoutes.CHANGE_REQUESTS + '/5' },
        (cr) => cr
      )
    );
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual(
      'API request error: Server responded with status code 404, Not Found. Server error message: Could not find the requested change request [#5].'
    );
    expect(result.current.responseData).toBeUndefined();
  });

  it('handles server loading for a while', async () => {
    server.use(
      rest.get(API_URL + apiRoutes.PROJECTS, (req, res, ctx) => {
        return res(ctx.delay(300), ctx.status(200));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest<Project[]>({ method: 'GET', url: apiRoutes.PROJECTS }, (prj) => prj)
    );
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toEqual('');
  });

  it('basic get array', async () => {
    server.use(
      rest.get(API_URL + apiRoutes.PROJECTS, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleAllProjects));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest<Project[]>({ method: 'GET', url: apiRoutes.PROJECTS }, (prj) => prj)
    );
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toHaveProperty('length', 5);
    expect(result.current.responseData![0]).toHaveProperty('name');
    expect(result.current.responseData![1]).toHaveProperty('dateCreated');
  });

  it('basic get single', async () => {
    server.use(
      rest.get(API_URL + apiRoutes.PROJECTS + '/1.1.1', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleProject1));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest<Project>({ method: 'GET', url: apiRoutes.PROJECTS + '/1.1.1' }, (prj) => prj)
    );
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).not.toHaveProperty('length');
    expect(result.current.responseData).toHaveProperty('name');
    expect(result.current.responseData).toHaveProperty('dateCreated');
  });

  it('basic post', async () => {
    server.use(
      rest.post(API_URL + apiRoutes.CHANGE_REQUESTS, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ ...exampleStandardChangeRequest, reviewNotes: req.body })
        );
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest<ChangeRequest>(
        { method: 'POST', url: apiRoutes.CHANGE_REQUESTS, data: 'big issues' },
        (cr) => cr
      )
    );
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');

    const response = result.current.responseData;
    expect(response).not.toHaveProperty('map');
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('dateSubmitted');
    expect(response).toHaveProperty('type');

    expect(response?.accepted).toBe(exampleStandardChangeRequest.accepted);
    expect(response?.reviewNotes).toBe('big issues');
    expect(response?.submitter.emailId).toBe(exampleStandardChangeRequest.submitter.emailId);
  });
});
