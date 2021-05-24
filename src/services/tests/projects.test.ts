/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import { apiRoutes, API_URL, exampleAllProjects, exampleProject1 } from 'utils';
import { useAllProjects, useSingleProject } from '../projects';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(API_URL + apiRoutes.PROJECTS, (req, res, ctx) => {
    return res(ctx.status(500, 'Mock server not set up yet'));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('project hooks', () => {
  it('handles getting a list of projects', async () => {
    server.use(
      rest.get(API_URL + apiRoutes.PROJECTS, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleAllProjects));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAllProjects());
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toHaveProperty('length', 5);
    expect(result.current.responseData![0]).toHaveProperty('gDriveLink');
    expect(result.current.responseData![1]).toHaveProperty('status');
    expect(result.current.responseData![1]).toHaveProperty('projectLead');
  });

  it('handles getting a single project', async () => {
    server.use(
      rest.get(API_URL + apiRoutes.PROJECTS + '/1.1.0', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleProject1));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useSingleProject({ car: 1, project: 1, workPackage: 0 })
    );
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).not.toHaveProperty('length');
    expect(result.current.responseData).toHaveProperty('wbsNum');
    expect(result.current.responseData).toHaveProperty('bomLink');
  });
});
