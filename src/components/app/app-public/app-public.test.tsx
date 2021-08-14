/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import { useAuth } from '../../../services/auth.hooks';
import { routes } from '../../../shared/routes';
import { Auth } from '../../../shared/types';
import AppPublic from './app-public';
import { mockAuth } from '../../../test-support/test-data/test-utils.stub';

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

const mockHook = () => {
  mockedUseAuth.mockReturnValue(mockAuth());
};

// Sets up the component under test with the desired values and renders it
const renderComponent = (path?: string, route?: string) => {
  mockHook();
  const RouterWrapper = routerWrapperBuilder({ path, route });
  return render(
    <RouterWrapper>
      <AppPublic />
    </RouterWrapper>
  );
};

describe('app public section', () => {
  it('renders login page', () => {
    renderComponent(routes.LOGIN, routes.LOGIN);

    expect(screen.getByText('NER PM Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Login Required')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
  });

  it('renders app authenticated', () => {
    renderComponent(routes.PROJECTS, routes.PROJECTS);

    expect(screen.getByText('app-authenticated')).toBeInTheDocument();
  });
});
