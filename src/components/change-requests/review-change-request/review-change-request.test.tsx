/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import { useAuth } from '../../../services/auth.hooks';
import { routes } from '../../../shared/routes';
import { Auth } from '../../../shared/types';
import { exampleStandardChangeRequest } from '../../../test-support/test-data/change-requests.stub';
import {
  exampleAdminUser,
  exampleGuestUser,
  exampleMemberUser
} from '../../../test-support/test-data/users.stub';
import { mockAuth } from '../../../test-support/test-data/test-utils.stub';
import ReviewChangeRequest from './review-change-request';

jest.mock('../../../services/auth.hooks');

const mockedUseAuth = useAuth as jest.Mock<Auth>;

const mockAuthHook = (user = exampleAdminUser) => {
  mockedUseAuth.mockReturnValue(mockAuth(user));
};

const renderComponent = (option: 'Accept' | 'Deny', route: string) => {
  const RouterWrapper = routerWrapperBuilder({ path: routes.CHANGE_REQUESTS_BY_ID, route });
  return render(
    <RouterWrapper>
      <ReviewChangeRequest option={option} />
    </RouterWrapper>
  );
};

describe('review change request', () => {
  it('renders change request review for accepting', () => {
    mockAuthHook();
    renderComponent('Accept', `${routes.CHANGE_REQUESTS}/${exampleStandardChangeRequest.crId}`);

    expect(screen.getByText('Accept Change Request')).toBeInTheDocument();
  });

  it('renders change request review for denying', () => {
    mockAuthHook();
    renderComponent('Deny', `${routes.CHANGE_REQUESTS}/${exampleStandardChangeRequest.crId}`);

    expect(screen.getByText('Deny Change Request')).toBeInTheDocument();
  });

  it('disables the submit button for guest users', () => {
    mockAuthHook(exampleGuestUser);
    renderComponent('Accept', `${routes.CHANGE_REQUESTS}/${exampleStandardChangeRequest.crId}`);

    expect(screen.getByText('Confirm')).toBeDisabled();
  });

  it('disables the submit button for member users', () => {
    mockAuthHook(exampleMemberUser);
    renderComponent('Accept', `${routes.CHANGE_REQUESTS}/${exampleStandardChangeRequest.crId}`);

    expect(screen.getByText('Confirm')).toBeDisabled();
  });

  it('enables the submit button for admin users', () => {
    mockAuthHook(exampleAdminUser);
    renderComponent('Accept', `${routes.CHANGE_REQUESTS}/${exampleStandardChangeRequest.crId}`);

    expect(screen.getByText('Confirm')).not.toBeDisabled();
  });
});
