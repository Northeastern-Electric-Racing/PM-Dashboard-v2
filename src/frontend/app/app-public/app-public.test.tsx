/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from '@prisma/client';
import { render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import { exampleAdminUser } from '../../../test-support/test-data/users.stub';
import { mockAuth } from '../../../test-support/test-data/test-utils.stub';
import { useAuth } from '../../../services/auth.hooks';
import { routes } from '../../../shared/routes';
import { Auth } from '../../../shared/types';
import AppPublic from './app-public';

jest.mock('../app-authenticated/app-authenticated', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>app-authenticated</div>;
    }
  };
});

jest.mock('../../../services/auth.hooks');

const mockedUseAuth = useAuth as jest.Mock<Auth>;

const mockHook = (isLoading: boolean, user?: User) => {
  mockedUseAuth.mockReturnValue(mockAuth(isLoading, user));
};

// Sets up the component under test with the desired values and renders it
const renderComponent = (path?: string, route?: string) => {
  const RouterWrapper = routerWrapperBuilder({ path, route });
  return render(
    <RouterWrapper>
      <AppPublic />
    </RouterWrapper>
  );
};

describe('app public section', () => {
  it('renders login page', () => {
    mockHook(false, exampleAdminUser);
    renderComponent(routes.LOGIN, routes.LOGIN);

    expect(screen.getByText('NER PM Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Login Required/i)).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders loading spinner', () => {
    mockHook(true, exampleAdminUser);
    renderComponent(routes.LOGIN, routes.LOGIN);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders app authenticated', () => {
    mockHook(false, exampleAdminUser);
    renderComponent(routes.PROJECTS, routes.PROJECTS);

    expect(screen.getByText('app-authenticated')).toBeInTheDocument();
  });
});
