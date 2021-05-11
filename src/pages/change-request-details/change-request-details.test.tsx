/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { apiRoutes, ChangeRequest, exampleStandardChangeRequest } from 'utils';
import { renderWithRouter } from '../../shared/test-utils';
import ChangeRequestDetails from './change-request-details';
import { useSingleChangeRequest } from '../../services/change-requests';
import { ApiHookReturn } from '../../services/api-request';

jest.mock('../../services/change-requests');

const mockedUseSingleChangeRequest = useSingleChangeRequest as jest.Mock<
  ApiHookReturn<ChangeRequest>
>;

const mockHook = (isLoading: boolean, errorMessage: string, responseData?: ChangeRequest) => {
  mockedUseSingleChangeRequest.mockReturnValue({ isLoading, errorMessage, responseData });
};

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  renderWithRouter(ChangeRequestDetails, {
    path: apiRoutes.CHANGE_REQUESTS_BY_ID,
    route: `${apiRoutes.CHANGE_REQUESTS}/1`
  });
};

describe('change request details container', () => {
  it('renders the loading indicator', () => {
    mockHook(true, '');
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the loaded change request', () => {
    mockHook(false, '', exampleStandardChangeRequest);
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText(exampleStandardChangeRequest.id, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(exampleStandardChangeRequest.scopeImpact)).toBeInTheDocument();
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
