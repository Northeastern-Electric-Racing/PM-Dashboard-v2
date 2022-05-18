/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ChangeRequestType } from 'utils';
import { render, screen, fireEvent } from '../../../../../test-support/test-utils';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { exampleAllProjects } from '../../../../../test-support/test-data/projects.stub';
import { wbsPipe } from '../../../../../shared/pipes';
import CommonFormFields from './common-form-fields';

/**
 * Sets up the component under test with the desired values and renders it.
 */

const typeStr = 'type';
const capitalizedTypeStr = 'Type';
const workPackageStr = 'Work Package';
const projectStr = 'Project';

const renderComponent = (setType: jest.Mock<any, any>) => {
  return render(
    <CommonFormFields
      setType={setType}
      projects={exampleAllProjects}
      workPkgs={exampleAllWorkPackages}
      handleChange={() => {
        return null;
      }}
    />
  );
};

describe('new change request page', () => {
  it('checks if the dropdown properly displays the options', () => {
    renderComponent(jest.fn());

    const projectText = wbsPipe(exampleAllProjects[0].wbsNum) + ' - ' + exampleAllProjects[0].name;
    const workPkgText =
      wbsPipe(exampleAllWorkPackages[0].wbsNum) + ' - ' + exampleAllWorkPackages[0].name;

    expect(screen.getByText(projectText)).toBeInTheDocument();
    expect(screen.getByText(workPkgText)).toBeInTheDocument();
  });

  it('renders the project form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(projectStr)).toBeInTheDocument();
  });

  it('renders the work package form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(workPackageStr)).toBeInTheDocument();
  });

  it('renders the type form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText(capitalizedTypeStr)).toBeInTheDocument();
  });

  it('checks if prop function is called when type changes', () => {
    const setType = jest.fn();
    renderComponent(setType);

    fireEvent.change(screen.getByTestId(typeStr), {
      target: { value: ChangeRequestType.StageGate }
    });
    expect(setType).toBeCalledWith(ChangeRequestType.StageGate);

    fireEvent.change(screen.getByTestId(typeStr), {
      target: { value: ChangeRequestType.Redefinition }
    });
    expect(setType).toBeCalledWith(ChangeRequestType.Redefinition);

    expect(setType).toHaveBeenCalledTimes(2);
  });
});
