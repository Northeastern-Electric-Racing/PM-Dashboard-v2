/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { exampleAllProjects } from '../../../test-support/test-data/projects.stub';
import { exampleAllWorkPackages } from '../../../test-support/test-data/work-packages.stub';
import { render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import { mockUseQueryResult } from '../../../test-support/test-data/test-utils.stub';
import { UseQueryResult } from 'react-query';
import { Project, WorkPackage } from 'utils';
import { useAllProjects } from '../../../services/projects.hooks';
import { useAllWorkPackages } from '../../../services/work-packages.hooks';
import NewChangeRequest from './new-change-request';

jest.mock('../../../services/projects.hooks');
jest.mock('../../../services/work-packages.hooks');

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
      <NewChangeRequest />
    </RouterWrapper>
  );
};

describe('change request page', () => {
  it('renders the new change requests container', () => {
    mockProjectHook(false, false, exampleAllProjects);
    mockWorkPkgHook(false, false, exampleAllWorkPackages);
    renderComponent();

    expect(screen.getByText('New Change Request')).toBeInTheDocument();
  });
});
