/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { FormContext } from '../work-package-container-edit';
import WorkPackageButtons from './work-package-buttons';

describe.skip('Work package edit buttons', () => {
  const setField = (field: string, value: any) => {};
  it('renders all of the buttons, with edit mode enabled', () => {
    render(
      <FormContext.Provider value={{ editMode: false, setField }}>
        <WorkPackageButtons setEditMode={() => {}} />
      </FormContext.Provider>
    );
    expect(screen.getByText('New Change Request')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeEnabled();
  });
  it('renders all of the buttons, with edit mode disabled', () => {
    render(
      <FormContext.Provider value={{ editMode: true, setField }}>
        <WorkPackageButtons setEditMode={() => {}} />
      </FormContext.Provider>
    );
    expect(screen.getByText('New Change Request')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeDisabled();
  });
});
