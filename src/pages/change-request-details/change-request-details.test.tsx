/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { ChangeRequest } from 'utils';
import { renderWithRouter } from '../../test-support/test-utils';
import { exampleAllChangeRequests } from '../../test-support/test-data/change-requests.stub';
import ChangeRequestDetails from './change-request-details';

/**
 * Sets up the component under test with the desired values and renders it.
 *
 * @param options WBS number to render the component at
 */
const renderComponent: Function = (id: string) => {
  const idNum: string = id || '1';
  renderWithRouter(ChangeRequestDetails, {
    path: '/change-requests/:wbsNum',
    route: `/change-requests/${idNum}`
  });
};

const endpointURL: string = '/.netlify/functions/change-requests/:id';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(endpointURL, (req, res, ctx) => {
    const result: ChangeRequest | undefined = exampleAllChangeRequests.find(
      (val) => req.params.id === val.id
    );
    if (result === undefined) {
      res(ctx.status(404, 'Cannot find the requested change request'));
    }
    return res(ctx.json(result));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('wbs element details component', () => {
  test('renders the page title', () => {
    renderComponent();
    expect(screen.getByText(/Change Request/i)).toBeInTheDocument();
  });

  test('renders the change request id number', () => {
    const id: string = '37';
    renderComponent(id);
    expect(screen.getByText(`#${id}`, { exact: false })).toBeInTheDocument();
  });
});
