/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { ChangeRequest, exampleStandardChangeRequest } from 'utils';
import { routes } from '../../shared/routes';
import { renderWithRouter } from '../../test-support/test-utils';
import { ApiHookReturn } from '../../services/api-request';
import { useSingleChangeRequest } from '../../services/change-requests';
import ChangeRequests from './change-requests';

jest.mock('../../services/change-requests');

describe('change request page', () => {
  it('renders the page title', () => {
    renderWithRouter(ChangeRequests, {
      path: routes.CHANGE_REQUESTS,
      route: routes.CHANGE_REQUESTS
    });

    expect(screen.getByText(/Change Requests Page/i)).toBeInTheDocument();
  });

  it('renders the change requests list page', () => {
    renderWithRouter(ChangeRequests, {
      path: routes.CHANGE_REQUESTS,
      route: routes.CHANGE_REQUESTS
    });

    expect(screen.getByText(/No Change Requests to Display/i)).toBeInTheDocument();
  });

  it('renders the change request id title', async () => {
    const mockedUseSingleChangeRequest = useSingleChangeRequest as jest.Mock<
      ApiHookReturn<ChangeRequest>
    >;
    mockedUseSingleChangeRequest.mockReturnValue({
      isLoading: false,
      errorMessage: '',
      responseData: exampleStandardChangeRequest
    });

    renderWithRouter(ChangeRequests, {
      path: routes.CHANGE_REQUESTS_BY_ID,
      route: `${routes.CHANGE_REQUESTS}/37`
    });

    expect(screen.getByText('37', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(exampleStandardChangeRequest.scopeImpact)).toBeInTheDocument();
  });
});
