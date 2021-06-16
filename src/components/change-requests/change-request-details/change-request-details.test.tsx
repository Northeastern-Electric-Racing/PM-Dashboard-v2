/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { UseQueryResult } from 'react-query';
import { ChangeRequest, exampleStandardChangeRequest } from 'utils';
import { routes } from '../../../shared/routes';
import { renderWithRouter } from '../../../test-support/test-utils';
import { mockUseQueryResult } from '../../../test-support/test-data/test-utils.stub';
import { useSingleChangeRequest } from '../../../services/change-requests.hooks';
import ChangeRequestDetails from './change-request-details';

jest.mock('../../services/change-requests.hooks');

const mockedUseSingleChangeRequest = useSingleChangeRequest as jest.Mock<
  UseQueryResult<ChangeRequest>
>;

const mockHook = (isLoading: boolean, isError: boolean, data?: ChangeRequest, error?: Error) => {
  mockedUseSingleChangeRequest.mockReturnValue(
    mockUseQueryResult<ChangeRequest>(isLoading, isError, data, error)
  );
};

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  renderWithRouter(<ChangeRequestDetails />, {
    path: routes.CHANGE_REQUESTS_BY_ID,
    route: `${routes.CHANGE_REQUESTS}/1`
  });
};

describe('change request details container', () => {
  it('renders the loading indicator', () => {
    mockHook(true, false);
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the loaded change request', () => {
    mockHook(false, false, exampleStandardChangeRequest);
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText(exampleStandardChangeRequest.id, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(exampleStandardChangeRequest.scopeImpact)).toBeInTheDocument();
  });

  it('handles the error with message', () => {
    mockHook(false, true, undefined, new Error('404 could not find the requested change request'));
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested change request')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockHook(false, true, undefined);
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Change Request')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
