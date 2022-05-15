/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import ProjectEditButton from './project-edit-button';

const setEditModeFn = jest.fn();

const renderComponent = (allowEdit = true) => {
  render(<ProjectEditButton setEditMode={setEditModeFn} allowEdit={allowEdit} />);
};

describe('test suite for ProjectEditButton', () => {
  it('render edit button', () => {
    renderComponent();

    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('calls setEditMode when edit button is clicked', () => {
    renderComponent();

    const editButton = screen.getByText('Edit');
    editButton.click();

    expect(setEditModeFn).toHaveBeenCalled();
    expect(setEditModeFn).toHaveBeenCalledTimes(1);
  });

  it('disables edit button when not allowed', () => {
    renderComponent(false);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeDisabled();
  });

  it('enables edit button when allowed', () => {
    renderComponent(true);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeEnabled();
  });
});
