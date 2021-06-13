/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import { apiUrls } from '../../shared/urls';
import {
  exampleAllWorkPackages,
  exampleWorkPackage1
} from '../../test-support/test-data/work-packages.stub';
import { useAllWorkPackages, useSingleWorkPackage } from '../work-packages';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(apiUrls.workPackages(), (req, res, ctx) => {
    return res(ctx.status(500, 'Mock server not set up yet'));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('project hooks', () => {
  it('handles getting a list of projects', async () => {
    server.use(
      rest.get(apiUrls.workPackages(), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleAllWorkPackages));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAllWorkPackages());
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toHaveProperty('length', 3);
    expect(result.current.responseData![0]).toHaveProperty('progress');
    expect(result.current.responseData![1]).toHaveProperty('status');
    expect(result.current.responseData![0]).toHaveProperty('budget');
    expect(result.current.responseData![1]).toHaveProperty('projectLead');
  });

  it('handles getting a single project', async () => {
    server.use(
      rest.get(apiUrls.workPackagesByWbsNum('1.1.1'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(exampleWorkPackage1));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useSingleWorkPackage({ car: 1, project: 1, workPackage: 1 })
    );
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).toBeUndefined();

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual('');
    expect(result.current.responseData).not.toHaveProperty('length');
    expect(result.current.responseData).toHaveProperty('wbsNum');
    expect(result.current.responseData).toHaveProperty('duration');
  });
});
