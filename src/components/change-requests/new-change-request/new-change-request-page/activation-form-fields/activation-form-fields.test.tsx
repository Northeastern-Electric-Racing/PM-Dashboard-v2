/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import ActivationFormFields from './activation-form-fields';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  return render(<ActivationFormFields />);
};

describe('new change request page', () => {
  it('renders the Project Lead form field', () => {
    renderComponent();

    expect(screen.getByText('Project Lead')).toBeInTheDocument();
  });

  it('renders the Project Manager form field', () => {
    renderComponent();

    expect(screen.getByText('Project Manager')).toBeInTheDocument();
  });

  it('renders the Start Date form field', () => {
    renderComponent();

    expect(screen.getByText('Start Date')).toBeInTheDocument();
  });

  it('renders the WP confirmation form field', () => {
    renderComponent();

    expect(screen.getByText('Are the WP details correct?')).toBeInTheDocument();
  });
});
