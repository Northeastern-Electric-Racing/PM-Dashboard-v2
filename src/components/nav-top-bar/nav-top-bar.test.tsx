/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../shared/test-utils';
import NavTopBar from './nav-top-bar';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent: Function = () => {
  renderWithRouter(NavTopBar, {});
};

describe('navigation top bar tests', () => {
  it('renders site title', () => {
    renderComponent();
    expect(screen.getByText(/NER PM Dashboard/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderComponent();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Changes/i)).toBeInTheDocument();
  });
});
