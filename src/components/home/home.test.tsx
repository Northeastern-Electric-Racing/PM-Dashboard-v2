/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { routes } from '../../shared/routes';
import { renderWithRouter } from '../../test-support/test-utils';
import Home from './home';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  renderWithRouter(<Home />, { path: routes.HOME, route: routes.HOME });
};

describe('home component', () => {
  it('renders welcome', () => {
    renderComponent();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});
