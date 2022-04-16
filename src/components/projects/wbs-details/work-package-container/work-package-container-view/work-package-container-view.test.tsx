/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../../../test-support/test-utils';
import { exampleWorkPackage2 } from '../../../../../test-support/test-data/work-packages.stub';
import WorkPackageContainerView from './work-package-container-view';

// Sets up the component under test with the desired values and renders it.
const renderComponent = (edit: boolean) => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <WorkPackageContainerView
        workPackage={exampleWorkPackage2}
        edit={{ editMode: false, setEditMode: () => null }}
      />
    </RouterWrapper>
  );
};

describe.skip('work package container view', () => {
  it('renders the project in read-only mode', () => {
    renderComponent(false);

    expect(screen.getByText('1.1.2 - Adhesive Shear Strength Test')).toBeInTheDocument();
    expect(screen.getByText('Dependencies')).toBeInTheDocument();
    expect(screen.getByText('Expected Activities')).toBeInTheDocument();
    expect(screen.getByText('Delieverables')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeEnabled();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  it('renders the project in edit mode', () => {
    renderComponent(true);

    expect(screen.getByText('1.1.2 - Adhesive Shear Strength Test')).toBeInTheDocument();
    expect(screen.getByText('Dependencies')).toBeInTheDocument();
    expect(screen.getByText('Expected Activities')).toBeInTheDocument();
    expect(screen.getByText('Delieverables')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeDisabled();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
