/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { exampleAllChangeRequests } from '../../test-support/test-data/change-requests.stub';
import ChangeRequestsTable from './change-requests-table';

const endpointURL: string = '/.netlify/functions/change-requests';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(endpointURL, (req, res, ctx) => {
    return res(ctx.json(exampleAllChangeRequests));
  })
);

// Sets up the component under test with the desired values and renders it.
const renderComponent: () => void = () => {
  render(<ChangeRequestsTable />);
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('change requests table container', () => {
  it('renders the table headers', async () => {
    renderComponent();
    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Submitter/i)).toBeInTheDocument();
    expect(screen.getByText(/WBS #/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Accepted/i)).toBeInTheDocument();
  });

  it('handles the api throwing an error', async () => {
    server.use(
      rest.get(endpointURL, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderComponent();

    expect(screen.getByText(/No Change Requests to Display/i)).toBeInTheDocument();
  });
});
