/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { render, screen, routerWrapperBuilder } from '../../../../test-support/test-utils';
import SidebarLink from './sidebar-link';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (label: string) => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <SidebarLink link={'/'} icon={faHome} label={label} />
    </RouterWrapper>
  );
};

describe('sidebar link test', () => {
  it('renders home page link', () => {
    renderComponent('Home');
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it('renders projects page link', () => {
    renderComponent('Projects');
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });

  it('renders change requests page link', () => {
    renderComponent('Changes');
    expect(screen.getByText(/Changes/i)).toBeInTheDocument();
  });
});
