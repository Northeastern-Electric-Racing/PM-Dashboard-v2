/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import { routes } from '../../../shared/routes';
import Home from './home';

jest.mock('./useful-links/useful-links', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>useful-links</div>;
    }
  };
});

jest.mock('./upcoming-deadlines/upcoming-deadlines', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>upcoming-deadlines</div>;
    }
  };
});

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({ path: routes.HOME, route: routes.HOME });
  return render(
    <RouterWrapper>
      <Home />
    </RouterWrapper>
  );
};

describe('home component', () => {
  it('renders welcome', () => {
    renderComponent();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it('renders useful links', () => {
    renderComponent();
    expect(screen.getByText('useful-links')).toBeInTheDocument();
  });

  it('renders upcoming deadlines', () => {
    renderComponent();
    expect(screen.getByText('upcoming-deadlines')).toBeInTheDocument();
  });
});
