/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../test-support/test-utils';
import { routes } from '../../shared/routes';
import Home from './home';

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

  it('renders glossary', () => {
    renderComponent();
    expect(screen.getByText(/Glossary Document/i)).toBeInTheDocument();
  });
});


