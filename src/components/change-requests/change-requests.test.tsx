/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { routes } from '../../shared/routes';
import { renderWithRouter } from '../../test-support/test-utils';
import ChangeRequests from './change-requests';

jest.mock('./change-requests-table/change-requests-table', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>change-requests-table</div>;
    }
  };
});

jest.mock('./change-request-details/change-request-details', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>change-request-details</div>;
    }
  };
});

describe('change request page', () => {
  it('renders the page title', () => {
    renderWithRouter(<ChangeRequests />, {
      path: routes.CHANGE_REQUESTS,
      route: routes.CHANGE_REQUESTS
    });

    expect(screen.getByText(/Change Requests Page/i)).toBeInTheDocument();
  });

  it('renders the change requests list page', () => {
    renderWithRouter(<ChangeRequests />, {
      path: routes.CHANGE_REQUESTS,
      route: routes.CHANGE_REQUESTS
    });

    expect(screen.getByText('change-requests-table')).toBeInTheDocument();
  });

  it('renders the change request id title', async () => {
    renderWithRouter(<ChangeRequests />, {
      path: routes.CHANGE_REQUESTS_BY_ID,
      route: `${routes.CHANGE_REQUESTS}/37`
    });

    expect(screen.getByText('change-request-details')).toBeInTheDocument();
  });
});
