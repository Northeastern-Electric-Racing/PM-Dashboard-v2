/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../../test-support/test-utils';
import { FormContext } from '../work-package-container-edit';
import WorkPackageButtons from './work-package-buttons';

const setEditModeFn = jest.fn();

const renderComponent = (allowEdit = true) => {
  const setField = (_field: string, _value: any) => {};
  return render(
    <FormContext.Provider value={{ editMode: false, setField }}>
      <WorkPackageButtons setEditMode={setEditModeFn} allowEdit={allowEdit} />
    </FormContext.Provider>
  );
};

describe('Work package edit buttons', () => {
  it('renders edit button', () => {
    renderComponent();

    expect(screen.getByText('Edit')).toBeInTheDocument();
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

  it('calls setEditMode when edit button is clicked', () => {
    renderComponent();

    const editButton = screen.getByText('Edit');
    editButton.click();

    expect(setEditModeFn).toHaveBeenCalled();
    expect(setEditModeFn).toHaveBeenCalledTimes(1);
  });
});
