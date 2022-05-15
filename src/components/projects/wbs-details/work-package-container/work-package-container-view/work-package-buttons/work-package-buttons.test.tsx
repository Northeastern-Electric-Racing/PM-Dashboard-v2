/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../../test-support/test-utils';
import { FormContext } from '../work-package-container-edit';
import WorkPackageButtons from './work-package-buttons';

const renderComponent = (editMode: boolean) => {
  return render(
    <FormContext.Provider value={{ editMode, setField: (field: string, value: any) => {} }}>
      <WorkPackageButtons setEditMode={() => {}} />
    </FormContext.Provider>
  );
};

describe.skip('Work package edit buttons', () => {
  it('renders all of the buttons, with edit mode enabled', () => {
    renderComponent(false);

    expect(screen.getByText('New Change Request')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeEnabled();
  });
  it('renders all of the buttons, with edit mode disabled', () => {
    renderComponent(true);

    expect(screen.getByText('New Change Request')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeDisabled();
  });
});
