/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-support/test-utils';
import { exampleAllChangeRequests } from '../../test-support/test-data/change-requests.stub';
import ChangeRequests from './change-requests';

const endpointURL: string = '/.netlify/functions/change-requests/1';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(endpointURL, (req, res, ctx) => {
    return res(ctx.json(exampleAllChangeRequests[0]));
  })
);

/**
 * Sets up the component under test with the desired values and renders it.
 *
 * @param options ID number to render the component at
 */
const renderComponent: Function = (idOverride: string) => {
  const idNum: string = idOverride || '1';
  renderWithRouter(ChangeRequests, {
    path: '/change-requests/:id',
    route: `/change-requests/${idNum}`
  });
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('change request details component', () => {
  it('renders the page title', () => {
    renderComponent();
    expect(screen.getByText(/Change Requests Page/i)).toBeInTheDocument();
  });

  it('renders the change request id title', () => {
    const id: string = '37';
    renderComponent(id);
    expect(screen.getByText(id, { exact: false })).toBeInTheDocument();
  });

  it('renders CR #69 as a project', () => {
    const id: string = '69';
    renderComponent(id);
    expect(screen.getByText(`Design Issue`)).toBeInTheDocument();
  });
});
