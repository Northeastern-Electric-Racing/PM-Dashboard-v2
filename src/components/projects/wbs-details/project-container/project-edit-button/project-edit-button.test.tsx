/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import ProjectEditButton from './project-edit-button';

describe('test suite for ProjectEditButton', () => {
  it('render edit button', () => {
    render(<ProjectEditButton setEditMode={() => null} />);

    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
