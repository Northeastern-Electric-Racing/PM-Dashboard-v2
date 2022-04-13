/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { UseQueryResult } from 'react-query';
import { ChangeRequestType, Project, WorkPackage } from 'utils';
import { wbsPipe } from '../../../shared/pipes';
import { render, screen, routerWrapperBuilder, fireEvent } from '../../../test-support/test-utils';
import { exampleAllProjects } from '../../../test-support/test-data/projects.stub';
import { exampleAllWorkPackages } from '../../../test-support/test-data/work-packages.stub';
import { mockUseQueryResult } from '../../../test-support/test-data/test-utils.stub';
import { useAllWorkPackages } from '../../../services/work-packages.hooks';
import { useAllProjects } from '../../../services/projects.hooks';
import NewChangeRequest from './new-change-request';

const oopsSorry = 'Oops, sorry!';
const project404 = '404 could not find the requested project request';
const workPkg404 = '404 could not find the requested work package request';
const error500 = '500 internal server error';
const newChangeRequestStr = 'New Change Request';
const projectLeadStr = 'Project Lead';
const scopeImpactStr = 'Scope Impact';

jest.mock('../../../services/projects.hooks');
jest.mock('../../../services/work-packages.hooks');

const mockedUseAllProjects = useAllProjects as jest.Mock<UseQueryResult<Project[]>>;

const mockedUseAllWorkPackages = useAllWorkPackages as jest.Mock<UseQueryResult<WorkPackage[]>>;

const mockProjectHook = (isLoading: boolean, isError: boolean, data?: Project[], error?: Error) => {
  mockedUseAllProjects.mockReturnValue(
    mockUseQueryResult<Project[]>(isLoading, isError, data, error)
  );
};

const mockWorkPkgHook = (
  isLoading: boolean,
  isError: boolean,
  data?: WorkPackage[],
  error?: Error
) => {
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
      <NewChangeRequest />
    </RouterWrapper>
  );
};

describe('change request page', () => {
  it('renders the loading indicator when both are loading', () => {
    mockProjectHook(true, false);
    mockWorkPkgHook(true, false);
    renderComponent();

    expect(screen.queryByText(newChangeRequestStr)).not.toBeInTheDocument();
  });

  it('renders the loading indicator when work pkgs are loading', () => {
    mockProjectHook(false, false);
    mockWorkPkgHook(true, false);
    renderComponent();

    expect(screen.queryByText(newChangeRequestStr)).not.toBeInTheDocument();
  });

  it('renders the loading indicator when projects are loading', () => {
    mockProjectHook(true, false);
    mockWorkPkgHook(false, false);
    renderComponent();

    expect(screen.queryByText(newChangeRequestStr)).not.toBeInTheDocument();
  });

  it('renders the loaded projects and work packages', () => {
    mockProjectHook(false, false, exampleAllProjects);
    mockWorkPkgHook(false, false, exampleAllWorkPackages);
    renderComponent();

    const projectText = wbsPipe(exampleAllProjects[0].wbsNum) + ' - ' + exampleAllProjects[0].name;
    const workPkgText =
      wbsPipe(exampleAllWorkPackages[0].wbsNum) + ' - ' + exampleAllWorkPackages[0].name;

    expect(screen.getByText(projectText)).toBeInTheDocument();
    expect(screen.getByText(workPkgText)).toBeInTheDocument();
  });

  it('handles the project error with message', () => {
    mockProjectHook(false, true, undefined, new Error(project404));
    mockWorkPkgHook(false, false, exampleAllWorkPackages);
    renderComponent();

    expect(screen.getByText(oopsSorry)).toBeInTheDocument();
    expect(screen.getByText(project404 + ' undefined undefined')).toBeInTheDocument();
  });

  it('handles the work project error with message', () => {
    mockProjectHook(false, false, exampleAllProjects);
    mockWorkPkgHook(false, true, undefined, new Error(workPkg404));
    renderComponent();

    expect(screen.getByText(oopsSorry)).toBeInTheDocument();
    expect(screen.getByText('undefined ' + workPkg404 + ' undefined')).toBeInTheDocument();
  });

  it('handles both errors with message', () => {
    mockProjectHook(false, true, undefined, new Error(error500));
    mockWorkPkgHook(false, true, undefined, new Error(workPkg404));
    renderComponent();

    expect(screen.getByText(oopsSorry)).toBeInTheDocument();
    expect(screen.getByText(error500 + ' ' + workPkg404 + ' undefined')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockProjectHook(false, true, undefined);
    mockWorkPkgHook(false, true, undefined);
    renderComponent();

    expect(screen.queryByText(newChangeRequestStr)).not.toBeInTheDocument();
    expect(screen.getByText(oopsSorry)).toBeInTheDocument();
  });

  it('renders the new change requests container', () => {
    mockProjectHook(false, false, exampleAllProjects);
    mockWorkPkgHook(false, false, exampleAllWorkPackages);
    renderComponent();

    expect(screen.getByText(newChangeRequestStr)).toBeInTheDocument();
  });

  it('checks if the form changes based on input', () => {
    mockProjectHook(false, false, exampleAllProjects);
    mockWorkPkgHook(false, false, exampleAllWorkPackages);
    renderComponent();

    expect(screen.queryByText(projectLeadStr)).not.toBeInTheDocument();
    expect(screen.getByText(scopeImpactStr)).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('type'), {
      target: { value: ChangeRequestType.StageGate }
    });

    expect(screen.queryByText(scopeImpactStr)).not.toBeInTheDocument();
    expect(screen.queryByText(projectLeadStr)).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId('type'), {
      target: { value: ChangeRequestType.Activation }
    });

    expect(screen.queryByText(scopeImpactStr)).not.toBeInTheDocument();
    expect(screen.getByText(projectLeadStr)).toBeInTheDocument();
  });
});
