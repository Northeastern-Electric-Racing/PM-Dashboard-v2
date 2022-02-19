import { UseQueryResult } from 'react-query';
import { Project } from 'utils';
import { render, screen, routerWrapperBuilder } from '../../../../test-support/test-utils';
import { mockUseQueryResult } from '../../../../test-support/test-data/test-utils.stub';
import { exampleWbsProject1 } from '../../../../test-support/test-data/wbs-numbers.stub';
import { exampleProject1 } from '../../../../test-support/test-data/projects.stub';
import { useSingleProject } from '../../../../services/projects.hooks';
import ProjectEditContainer from './project-edit-container';

jest.mock('../../../../services/projects.hooks');

const mockedUseSingleWorkPackage = useSingleProject as jest.Mock<UseQueryResult<Project>>;

const mockHook = (isLoading: boolean, isError: boolean, data?: Project, error?: Error) => {
  mockedUseSingleWorkPackage.mockReturnValue(
    mockUseQueryResult<Project>(isLoading, isError, data, error)
  );
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <ProjectEditContainer wbsNum={exampleWbsProject1} />
    </RouterWrapper>
  );
};

describe('project container', () => {
  it('renders the loading indicator', () => {
    mockHook(true, false, exampleProject1);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Project Manager')).not.toBeInTheDocument();
  });

  it('renders the loaded project', () => {
    mockHook(false, false);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('1.12.0 - Bodywork Concept of Design')).toBeInTheDocument();
    expect(screen.getByText('Work Package Details')).toBeInTheDocument();
    expect(screen.getByText('Duration:')).toBeInTheDocument();
    expect(screen.getByText('Progress:')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeEnabled();
  });

  it('handles the error with message', () => {
    mockHook(false, true, undefined, new Error('404 could not find the requested work package'));
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested work package')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockHook(false, true);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('work package')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
