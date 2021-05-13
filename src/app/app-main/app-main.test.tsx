/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-support/test-utils';
import AppMain from './app-main';

// Sets up the component under test with the desired values and renders it
const renderComponent = (path?: string, route?: string) => {
  renderWithRouter(AppMain, { path, route });
};

describe('app main', () => {
  it('renders login page', () => {
    renderComponent();
    expect(screen.getByText('NER PM Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Login Required')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('can login to the application', () => {
    renderComponent();
    const input: HTMLElement = screen.getByLabelText('name');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'person' } });
    fireEvent.click(screen.getByText('Log In'));
    expect(input).not.toBeInTheDocument();
    expect(screen.getByText(/Home!/i)).toBeInTheDocument();
  });
});
