/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../test-support/test-utils';
import CreateChangeRequestsView from './create-change-request-view';

/**
 * Mock function for submitting the form, use if there is additional functionality added while submitting
 */
const mockHandleSubmit = jest.fn();

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  return render(<CreateChangeRequestsView onSubmit={mockHandleSubmit} />);
};

describe('create new change request page test suite', () => {
  it('renders form title', () => {
    renderComponent();

    expect(screen.queryByText('New Change Request')).toBeInTheDocument();
  });

  it('renders labels for inputs', () => {
    renderComponent();

    expect(screen.getByLabelText('WBS Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('What')).toBeInTheDocument();
    expect(screen.getByLabelText('Why')).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Impact/).length).toBe(3);
  });

  it('renders all buttons', () => {
    renderComponent();

    expect(screen.getByText('Add Reason')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  /**
   * NOTE: strange error message of `"messageParent" can only be used inside a worker` appeared
   * when trying to grab textboxes by role, so be aware of testing too much here. Need to investigate
   * further if we can get around this to improve testing coverage.
   */
});
