/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../shared/test-utils';
import AppPublic from './app-public';

// Sets up the component under test with the desired values and renders it
const renderComponent = (path?: string, route?: string) => {
  renderWithRouter(AppPublic, { path, route });
};

describe('app public section', () => {
  it('renders login page', () => {
    renderComponent();
    expect(screen.getByText('NER PM Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Login Required')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
  });
});
