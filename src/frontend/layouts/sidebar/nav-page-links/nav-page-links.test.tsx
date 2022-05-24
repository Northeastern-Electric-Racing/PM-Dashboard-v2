/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, routerWrapperBuilder, screen } from '../../../../test-support/test-utils';
import NavPageLinks, { LinkItem } from './nav-page-links';
import { faExchangeAlt, faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../../../../shared/routes';

const linkItems: LinkItem[] = [
  {
    name: 'Home',
    icon: faHome,
    route: routes.HOME
  },
  {
    name: 'Projects',
    icon: faFolder,
    route: routes.PROJECTS
  },
  {
    name: 'Change Requests',
    icon: faExchangeAlt,
    route: routes.CHANGE_REQUESTS
  }
];

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <NavPageLinks linkItems={linkItems} />
    </RouterWrapper>
  );
};

describe('Navigation Page Links Tests', () => {
  it('Renders Home Page Link', () => {
    renderComponent();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it('Renders Projects Page Link', () => {
    renderComponent();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });

  it('Renders Change Requests Page Link', () => {
    renderComponent();
    expect(screen.getByText(/Change Requests/i)).toBeInTheDocument();
  });
});
