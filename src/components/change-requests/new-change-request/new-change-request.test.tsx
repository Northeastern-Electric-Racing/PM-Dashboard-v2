/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../test-support/test-utils';
import NewChangeRequest from './new-change-request';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  return render(<NewChangeRequest />);
};

describe('change request page', () => {
  it('renders the new change requests container', () => {
    renderComponent();

    expect(screen.getByText('placeholder')).toBeInTheDocument();
  });
});
