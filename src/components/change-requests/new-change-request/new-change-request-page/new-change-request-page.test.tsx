/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { exampleAllWorkPackages } from '../../../../test-support/test-data/work-packages.stub';
import { exampleAllProjects } from '../../../../test-support/test-data/projects.stub';
import { mockUseQueryResult } from '../../../../test-support/test-data/test-utils.stub';
import { render, screen, routerWrapperBuilder, fireEvent } from '../../../../test-support/test-utils';
import { UseQueryResult } from 'react-query';
import { Project, WorkPackage } from 'utils';
import { useAllProjects } from '../../../../services/projects.hooks';
import { useAllWorkPackages } from '../../../../services/work-packages.hooks';
import { wbsPipe } from '../../../../shared/pipes';
import NewChangeRequestPage from './new-change-request-page';


jest.mock('../../../../services/projects.hooks');
jest.mock('../../../../services/work-packages.hooks');

const mockedUseAllProjects = useAllProjects as jest.Mock<
  UseQueryResult<Project[]>
>;

const mockedUseAllWorkPackages = useAllWorkPackages as jest.Mock<
  UseQueryResult<WorkPackage[]>
>;

const mockProjectHook = (isLoading: boolean, isError: boolean, data?: Project[], error?: Error) => {
  mockedUseAllProjects.mockReturnValue(
    mockUseQueryResult<Project[]>(isLoading, isError, data, error)
  );
};

const mockWorkPkgHook = (isLoading: boolean, isError: boolean, data?: WorkPackage[], error?: Error) => {
  mockedUseAllWorkPackages.mockReturnValue(
    mockUseQueryResult<WorkPackage[]>(isLoading, isError, data, error)
  );
};
/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <NewChangeRequestPage />
    </RouterWrapper>
  );
};

describe('new change request page', () => {
  it('renders the loading indicator when both are loading', () => {
    mockProjectHook(true, false);
    mockWorkPkgHook(true, false);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Date Submitted')).not.toBeInTheDocument();
  });

  it('renders the loading indicator when work pkgs are loading', () => {
    mockProjectHook(false, false);
    mockWorkPkgHook(true, false);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Date Submitted')).not.toBeInTheDocument();
  });

  it('renders the loading indicator when projects are loading', () => {
    mockProjectHook(true, false);
    mockWorkPkgHook(false, false);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Date Submitted')).not.toBeInTheDocument();
  });

  it('renders the loaded projects and work packages', () => {
    mockProjectHook(false, false, exampleAllProjects);
    mockWorkPkgHook(false, false, exampleAllWorkPackages);
    renderComponent();

    const projectText = wbsPipe(exampleAllProjects[0].wbsNum) +  " - " + exampleAllProjects[0].name;    
    const workPkgText = wbsPipe(exampleAllWorkPackages[0].wbsNum) +  " - " + exampleAllWorkPackages[0].name;

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText(projectText)).toBeInTheDocument();
    expect(screen.getByText(workPkgText)).toBeInTheDocument();
  });

  it('handles the project error with message', () => {
    mockProjectHook(false, true, undefined, new Error('404 could not find the requested project request'));
    mockWorkPkgHook(false, false, exampleAllWorkPackages);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested project request')).toBeInTheDocument();
  });

  it('handles the work project error with message', () => {
    mockProjectHook(false, false, exampleAllProjects);
    mockWorkPkgHook(false, true, undefined, new Error('404 could not find the requested work package request'));
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested work package request')).toBeInTheDocument();
  });

  it('handles both errors with message', () => {
    mockProjectHook(false, true, undefined, new Error('500 internal server error'));
    mockWorkPkgHook(false, true, undefined, new Error('404 could not find the requested work package request'));
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('500 internal server error; 404 could not find the requested work package request')).toBeInTheDocument();
  });


  it('handles the error with no message', () => {
    mockProjectHook(false, true, undefined);
    mockWorkPkgHook(false, true, undefined);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('New Change Request')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });

  it('checks if the form changes based on input', () => {
    mockProjectHook(false, false, exampleAllProjects);
    mockWorkPkgHook(false, false, exampleAllWorkPackages);
    renderComponent();

    expect(screen.queryByText('Who is Required for Design Review?')).not.toBeInTheDocument();
    expect(screen.queryByText('Project Lead')).not.toBeInTheDocument();
    expect(screen.getByText('Scope Impact')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('formType'), { target: { value: "Stage Gate" } });

    expect(screen.queryByText('Scope Impact')).not.toBeInTheDocument();
    expect(screen.queryByText('Project Lead')).not.toBeInTheDocument();
    expect(screen.getByText('Who is Required for Design Review?')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('formType'), { target: { value: "Initiation" } });
    expect(screen.queryByText('Scope Impact')).not.toBeInTheDocument();
    expect(screen.queryByText('Who is Required for Design Review?')).not.toBeInTheDocument();
    expect(screen.getByText('Project Lead')).toBeInTheDocument();
  });
});
