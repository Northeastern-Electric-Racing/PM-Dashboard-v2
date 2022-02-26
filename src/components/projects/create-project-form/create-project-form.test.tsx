/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../test-support/test-utils';
import CreateProjectForm from './create-project-form';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  return render(<CreateProjectForm />);
};

describe('create project form test suite', () => {
  it('render view component', () => {
    renderComponent();

    expect(screen.getByText('Create New Project')).toBeInTheDocument();
  });
});
