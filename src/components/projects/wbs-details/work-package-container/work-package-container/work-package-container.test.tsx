/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../../../test-support/test-utils';
import { exampleWorkPackage2 } from '../../../../../test-support/test-data/work-packages.stub';
import WorkPackageContainer from './work-package-container';
import { FormContext } from '../work-package-container';

// Sets up the component under test with the desired values and renders it.
const renderComponent = (edit: boolean) => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <FormContext.Provider value={{ editMode: edit, setField: () => {} }}>
        <WorkPackageContainer
          data={exampleWorkPackage2}
          editMode={edit}
          setEditMode={() => {}}
          handleSubmit={() => {}}
        />
      </FormContext.Provider>
    </RouterWrapper>
  );
};

describe('work package container view', () => {
  it('renders the project in read-only mode', () => {
    renderComponent(false);

    expect(screen.getByText('1.1.2 - Adhesive Shear Strength Test')).toBeInTheDocument();
    expect(screen.getByText('Work Package Details')).toBeInTheDocument();
    expect(screen.getByText('Duration:')).toBeInTheDocument();
    expect(screen.getByText('Progress:')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeEnabled();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  it('renders the project in edit mode', () => {
    renderComponent(true);

    expect(screen.getByText('1.1.2 - Adhesive Shear Strength Test')).toBeInTheDocument();
    expect(screen.getByText('Work Package Details')).toBeInTheDocument();
    expect(screen.getByText('Duration:')).toBeInTheDocument();
    expect(screen.getByText('Progress:')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeDisabled();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
