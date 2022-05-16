/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { UseQueryResult } from 'react-query';
import { Project } from 'utils';
import {
  render,
  screen,
  routerWrapperBuilder,
  fireEvent
} from '../../../../../test-support/test-utils';
import { Auth } from '../../../../../shared/types';
import { useSingleProject } from '../../../../../services/projects.hooks';
import { useAuth } from '../../../../../services/auth.hooks';
import { exampleWbsProject1 } from '../../../../../test-support/test-data/wbs-numbers.stub';
import {
  mockAuth,
  mockUseQueryResult
} from '../../../../../test-support/test-data/test-utils.stub';
import { exampleProject1 } from '../../../../../test-support/test-data/projects.stub';
import {
  exampleAdminUser,
  exampleGuestUser
} from '../../../../../test-support/test-data/users.stub';
import ProjectContainer from './project-container';
import { act } from 'react-dom/test-utils';

jest.mock('../../../../services/projects.hooks');

const mockedUseSingleProject = useSingleProject as jest.Mock<UseQueryResult<Project>>;

const mockSingleProjectHook = (
  isLoading: boolean,
  isError: boolean,
  data?: Project,
  error?: Error
) => {
  mockedUseSingleProject.mockReturnValue(
    mockUseQueryResult<Project>(isLoading, isError, data, error)
  );
};

jest.mock('../../../../services/auth.hooks');

const mockedUseAuth = useAuth as jest.Mock<Auth>;

const mockAuthHook = (user = exampleAdminUser) => {
  mockedUseAuth.mockReturnValue(mockAuth(user));
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <ProjectContainer wbsNum={exampleWbsProject1} />
    </RouterWrapper>
  );
};

describe('Rendering Project Container', () => {
  it('renders the loading indicator', () => {
    mockSingleProjectHook(true, false);
    mockAuthHook();
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Project Lead')).not.toBeInTheDocument();
  });

  it('renders the loaded project', () => {
    mockSingleProjectHook(false, false, exampleProject1);
    mockAuthHook();
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('1.12.0 - Impact Attenuator')).toBeInTheDocument();
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Work Packages')).toBeInTheDocument();
    expect(screen.getByText('Bodywork Concept of Design')).toBeInTheDocument();
  });

  it('handles the error with message', () => {
    mockSingleProjectHook(
      false,
      true,
      undefined,
      new Error('404 could not find the requested project')
    );
    mockAuthHook();
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested project')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockSingleProjectHook(false, true);
    mockAuthHook();
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('project')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });

  it('disables the edit button for guest users', () => {
    mockSingleProjectHook(false, false, exampleProject1);
    mockAuthHook(exampleGuestUser);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('1.12.0 - Impact Attenuator')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByText('Actions'));
    });
    expect(screen.getByText('Edit')).toHaveClass('disabled');
  });

  it('enables the edit button for admin users', () => {
    mockSingleProjectHook(false, false, exampleProject1);
    mockAuthHook(exampleAdminUser);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('1.12.0 - Impact Attenuator')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByText('Actions'));
    });
    expect(screen.getByText('Edit')).not.toHaveClass('disabled');
  });
});
