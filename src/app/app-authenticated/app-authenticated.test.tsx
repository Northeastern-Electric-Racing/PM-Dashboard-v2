/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-support/test-utils';
import AppAuthenticated from './app-authenticated';

// Sets up the component under test with the desired values and renders it
const renderComponent = (path?: string, route?: string) => {
  renderWithRouter(<AppAuthenticated />, { path, route });
};

describe('app authenticated section', () => {
  it('renders nav links', () => {
    renderComponent();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Changes')).toBeInTheDocument();
  });

  it('can navigate to projects page', () => {
    renderComponent();
    const homeEle: HTMLElement = screen.getByText('This is the Home Page');
    expect(homeEle).toBeInTheDocument();
    fireEvent.click(screen.getByText('Projects'));
    expect(homeEle).not.toBeInTheDocument();
    expect(screen.getByText(/Projects Page/i)).toBeInTheDocument();
  });
});
