/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { routes } from '../../shared/routes';
import { renderWithRouter } from '../../test-support/test-utils';
import Settings from './settings';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  renderWithRouter(<Settings />, { path: routes.SETTINGS, route: routes.SETTINGS });
};

describe('settings page component', () => {
  it('renders title', () => {
    renderComponent();
    expect(screen.getByText('This is the Settings Page')).toBeInTheDocument();
  });

  it('renders user', () => {
    renderComponent();
    expect(screen.getByText('User:')).toBeInTheDocument();
  });
});
