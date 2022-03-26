/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../test-support/test-utils';
import NewChangeRequestPage from './new-change-request-page';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  return render(<NewChangeRequestPage />);
};

describe('new change request page', () => {
  it('renders the new change requests page', () => {
    renderComponent();

    expect(screen.getAllByText('New Change Request')[0]).toBeInTheDocument();
  });
});
