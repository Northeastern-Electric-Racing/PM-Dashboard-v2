/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, fireEvent } from '../../../../../test-support/test-utils';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { exampleAllProjects } from '../../../../../test-support/test-data/projects.stub';
import { wbsPipe } from '../../../../../shared/pipes';
import CommonFormFields from './common-form-fields';

/**
 * Sets up the component under test with the desired values and renders it.
 */



const renderComponent = (setFormType: jest.Mock<any, any>) => {
  return render(<CommonFormFields setFormType={setFormType} projects={exampleAllProjects} workPkgs={exampleAllWorkPackages} />);
};

describe('new change request page', () => {
  it('checks if the dropdown properly displays the options', () => {
    renderComponent(jest.fn());
    
    const projectText = wbsPipe(exampleAllProjects[0].wbsNum) +  " - " + exampleAllProjects[0].name;    
    const workPkgText = wbsPipe(exampleAllWorkPackages[0].wbsNum) +  " - " + exampleAllWorkPackages[0].name;

    expect(screen.getByText(projectText)).toBeInTheDocument();
    expect(screen.getByText(workPkgText)).toBeInTheDocument();
    expect(screen.getByText('New Function')).toBeInTheDocument();
  });

  it('renders the project form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText('Project')).toBeInTheDocument();
  });

  it('renders the work package form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText('Work Package')).toBeInTheDocument();
  });

  it('renders the type form field', () => {
    renderComponent(jest.fn());

    expect(screen.getByText('Form Type')).toBeInTheDocument();
  });

  it('checks if prop function is called when form type changes', () => {
    const setFormType = jest.fn();
    renderComponent(setFormType);

    fireEvent.change(screen.getByTestId('formType'), { target: { value: "Stage Gate" } });
    expect(setFormType).toBeCalledWith("Stage Gate");

    fireEvent.change(screen.getByTestId('formType'), { target: { value: "New Function" } });
    expect(setFormType).toBeCalledWith("New Function");

    fireEvent.change(screen.getByTestId('formType'), { target: { value: "Initiation" } });
    expect(setFormType).toBeCalledWith("Initiation");

    expect(setFormType).toHaveBeenCalledTimes(3);
  });
});
