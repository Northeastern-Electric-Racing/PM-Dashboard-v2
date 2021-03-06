/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../../test-support/test-utils';
import NavPageLinks from './nav-page-links';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <NavPageLinks />
    </RouterWrapper>
  );
};

describe('navigation page links tests', () => {
  it('renders home page link', () => {
    renderComponent();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it('renders projects page link', () => {
    renderComponent();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });

  it('renders change requests page link', () => {
    renderComponent();
    expect(screen.getByText(/Changes/i)).toBeInTheDocument();
  });
});
