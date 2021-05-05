/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import { apiRoutes, API_URL, exampleWbsProject1, exampleWorkPackage1 } from 'utils';
import WorkPackageContainer from './work-package-container';
import { wbsPipe } from '../../shared/pipes';

const endpointURL: string = `${API_URL}/${apiRoutes.WORK_PACKAGES}/${wbsPipe(exampleWbsProject1)}`;

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(endpointURL, (req, res, ctx) => {
    return res(ctx.json(exampleWorkPackage1));
  })
);

// Sets up the component under test with the desired values and renders it.
const renderComponent: () => void = () => {
  render(<WorkPackageContainer wbsNum={exampleWbsProject1} />);
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('work package container', () => {
  it('renders the table headers', async () => {
    renderComponent();

    await waitFor(() => screen.getAllByText(wbsPipe(exampleWbsProject1)));
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
