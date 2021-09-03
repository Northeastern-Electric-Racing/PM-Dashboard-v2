/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import StageGateFormFields from './stage-gate-form-fields';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  return render(<StageGateFormFields />);
};

describe('new stage gate form fields', () => {
  it('renders the design reviewer form field', () => {
    renderComponent();

    expect(screen.getByText('Who is Required for Design Review?')).toBeInTheDocument();
  });

  it('renders the Leftover Budget form field', () => {
    renderComponent();

    expect(screen.getByText('Leftover Budget')).toBeInTheDocument();
  });

  it('renders the status form field', () => {
    renderComponent();

    expect(screen.getByText('Is everything done?')).toBeInTheDocument();
  });
});
