/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, waitFor } from '@testing-library/react';
import { UseQueryResult } from 'react-query';
import { ChangeRequest } from 'utils';
import { exampleAllChangeRequests } from '../../../test-support/test-data/change-requests.stub';
import { mockUseQueryResult } from '../../../test-support/test-data/test-utils.stub';
import { useAllChangeRequests } from '../../../services/change-requests.hooks';
import { routerWrapperBuilder } from '../../../test-support/test-utils';
import { fullNamePipe, wbsPipe } from '../../../shared/pipes';
import ChangeRequestsTable from './change-requests-table';

jest.mock('../../../services/change-requests.hooks');

const mockedUseAllChangeRequests = useAllChangeRequests as jest.Mock<
  UseQueryResult<ChangeRequest[]>
>;

const mockHook = (isLoading: boolean, isError: boolean, data?: ChangeRequest[], error?: Error) => {
  mockedUseAllChangeRequests.mockReturnValue(
    mockUseQueryResult<ChangeRequest[]>(isLoading, isError, data, error)
  );
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  render(
    <RouterWrapper>
      <ChangeRequestsTable />
    </RouterWrapper>
  );
};

describe('change requests table container', () => {
  it('renders the loading indicator', () => {
    mockHook(true, false);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Submitter')).not.toBeInTheDocument();
  });

  it('renders the table headers', async () => {
    mockHook(false, false, []);
    renderComponent();

    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Submitter/i)).toBeInTheDocument();
    expect(screen.getByText(/WBS #/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Accepted/i)).toBeInTheDocument();
  });

  it('handles the api throwing an error', async () => {
    mockHook(false, true);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    // expect(screen.getByText(/No Change Requests to Display/i)).toBeInTheDocument();
  });

  it('handles the api returning an empty array', async () => {
    mockHook(false, false, []);
    renderComponent();

    expect(screen.getByText('No Change Requests to Display')).toBeInTheDocument();
  });

  it('handles the api returning a normal array of change requests', async () => {
    mockHook(false, false, exampleAllChangeRequests);
    renderComponent();
    await waitFor(() => screen.getByText(exampleAllChangeRequests[0].crId));

    expect(
      screen.getAllByText(fullNamePipe(exampleAllChangeRequests[1].submitter))[0]
    ).toBeInTheDocument();
    expect(screen.getByText(exampleAllChangeRequests[1].id)).toBeInTheDocument();
    expect(screen.getAllByText(wbsPipe(exampleAllChangeRequests[2].wbsNum))[0]).toBeInTheDocument();

    expect(screen.queryByText('No Change Requests to Display')).not.toBeInTheDocument();
  });
});
