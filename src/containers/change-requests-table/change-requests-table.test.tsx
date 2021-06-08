/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import ChangeRequestsTable from './change-requests-table';
import { useAllChangeRequests } from '../../services/change-requests';
import { ApiHookReturn } from '../../services/api-request';
import { ChangeRequest,exampleAllChangeRequests } from 'utils';
import { routes } from '../../shared/routes';
import { renderWithRouter } from '../../test-support/test-utils'
import { wbsPipe } from '../../shared/pipes';


jest.mock('../../services/change-requests');

// Mock the server endpoint(s) that the component will hit
const mockedUseAllChangeRequest = useAllChangeRequests as jest.Mock<
  ApiHookReturn<ChangeRequest[]>
>;

const mockHook = (isLoading: boolean, errorMessage: string, responseData?: ChangeRequest[]) => {
  mockedUseAllChangeRequest.mockReturnValue({ isLoading, errorMessage, responseData });
};

// Sets up the component under test with the desired values and renders it.
const renderComponent: () => void = () => {
  renderWithRouter(<ChangeRequestsTable />, {
    path: routes.CHANGE_REQUESTS,
    route: `${routes.CHANGE_REQUESTS}`
  });
};

describe('change requests table container', () => {

  it('renders the loading indicator', () => {
    mockHook(true, '');
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the table headers', async () => {
    mockHook(false, '', exampleAllChangeRequests);
    renderComponent();
    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Submitter/i)).toBeInTheDocument();
    expect(screen.getByText(/WBS #/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Accepted/i)).toBeInTheDocument();
  });

  it('renders the loaded change request', () => {
    mockHook(false, '', exampleAllChangeRequests);
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText(exampleAllChangeRequests[0].id, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(exampleAllChangeRequests[0].submitterName!)).toBeInTheDocument();
    expect(screen.getByText(wbsPipe(exampleAllChangeRequests[0].wbsNum))).toBeInTheDocument();
    expect(screen.getByText(exampleAllChangeRequests[0].type)).toBeInTheDocument();
    expect(screen.getByText(exampleAllChangeRequests[0].dateReviewed!.toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(exampleAllChangeRequests[0].accepted!.toString())).toBeInTheDocument();
    expect(screen.getByText(exampleAllChangeRequests[0].dateImplemented!.toLocaleDateString())).toBeInTheDocument();
  });

  it('handles the error with message', () => {
    mockHook(false, '404 could not find the requested change request');
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested change request')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockHook(false, '');
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Change Request')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
