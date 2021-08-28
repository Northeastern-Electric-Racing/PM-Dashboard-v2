/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import StandardFormFields from './standard-form-fields';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  return render(<StandardFormFields />);
};

describe('new change request page', () => {
  it('renders the What form field', () => {
    renderComponent();

    expect(screen.getByText('What')).toBeInTheDocument();
  });

  it('renders the Scope Impact form field', () => {
    renderComponent();

    expect(screen.getByText('Scope Impact')).toBeInTheDocument();
  });

  it('renders the Budget Impact form field', () => {
    renderComponent();

    expect(screen.getByText('Budget Impact')).toBeInTheDocument();
  });

  it('renders the Timeline Impact form field', () => {
    renderComponent();

    expect(screen.getByText('Timeline Impact')).toBeInTheDocument();
  });

  it('renders the Why form field', () => {
    renderComponent();

    expect(screen.getByText('Why')).toBeInTheDocument();
  });

  it('renders the Documentation Link form field', () => {
    renderComponent();

    expect(screen.getByText(/Documentation Link/i)).toBeInTheDocument();
  });
});
