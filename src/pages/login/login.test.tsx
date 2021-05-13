/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-support/test-utils';
import Login from './login';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  renderWithRouter(Login, { path: '/login', route: `/login` });
};

describe('login component', () => {
  it('renders title', () => {
    renderComponent();
    expect(screen.getByText(/NER PM Dashboard/i)).toBeInTheDocument();
  });

  it('renders help text', () => {
    renderComponent();
    expect(screen.getByText(/Login Required/i)).toBeInTheDocument();
  });

  it('renders login button', () => {
    renderComponent();
    const btn = screen.getByText('Log In');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('class', 'btn btn-primary');
  });

  it('has clickable login button', async () => {
    renderComponent();
    const btn = screen.getByText('Log In');
    fireEvent.click(btn);
    expect(btn).not.toBeInTheDocument();
  });
});
