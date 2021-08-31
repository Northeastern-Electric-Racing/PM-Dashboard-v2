/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import CommonFormFields from './common-form-fields';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  return render(<CommonFormFields />);
};

describe('new change request page', () => {
  it('renders the project form field', () => {
    renderComponent();

    expect(screen.getByText('Project')).toBeInTheDocument();
  });

  it('renders the work package form field', () => {
    renderComponent();

    expect(screen.getByText('Work Package')).toBeInTheDocument();
  });

  it('renders the type form field', () => {
    renderComponent();

    expect(screen.getByText('Type')).toBeInTheDocument();
  });
});
