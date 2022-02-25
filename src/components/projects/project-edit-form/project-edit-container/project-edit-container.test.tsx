import { render, screen, routerWrapperBuilder } from '../../../../test-support/test-utils';
import { exampleWbsProject1 } from '../../../../test-support/test-data/wbs-numbers.stub';
import { exampleProject1 } from '../../../../test-support/test-data/projects.stub';
import ProjectEditContainer from './project-edit-container';
import { wbsPipe } from '../../../../shared/pipes';
import { useAllUsers } from '../../../../services/users.hooks';
import { UseQueryResult } from 'react-query';
import { User } from 'utils';
import { mockUseQueryResult } from '../../../../test-support/test-data/test-utils.stub';
import {
  exampleAdminUser,
  exampleAppAdminUser,
  exampleLeadershipUser
} from '../../../../test-support/test-data/users.stub';

// jest.mock('../../../../services/projects.hooks');

// const mockedUseSingleProject = useSingleProject as jest.Mock<UseQueryResult<Project>>;

// const mockHook = (isLoading: boolean, isError: boolean, data?: Project, error?: Error) => {
//   mockedUseSingleProject.mockReturnValue(
//     mockUseQueryResult<Project>(isLoading, isError, data, error)
//   );
// };

jest.mock('../../../../services/users.hooks');

const mockedUseAllUsers = useAllUsers as jest.Mock<UseQueryResult<User[]>>;

const mockHook = (isLoading: boolean, isError: boolean, data?: User[], error?: Error) => {
  mockedUseAllUsers.mockReturnValue(mockUseQueryResult<User[]>(isLoading, isError, data, error));
};

const users = [exampleAdminUser, exampleAppAdminUser, exampleLeadershipUser];

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <ProjectEditContainer
        wbsNum={exampleWbsProject1}
        proj={exampleProject1}
        setEditMode={() => null}
      />
    </RouterWrapper>
  );
};

describe('test suite for ProjectEditContainer', () => {
  describe('rendering subcomponents of ProjectEditContainer', () => {
    it('renders title', () => {
      mockHook(false, false, users);
      renderComponent();

      expect(
        screen.getByText(`${wbsPipe(exampleWbsProject1)} - ${exampleProject1.name}`)
      ).toBeInTheDocument();
    });

    it('renders change request input', () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByPlaceholderText('Change Request ID #')).toBeInTheDocument();
    });

    it('render title of ProjectEditDetails', () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Project Details (EDIT)')).toBeInTheDocument();
    });

    it('render title of ProjectEditSummary', () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Project Summary')).toBeInTheDocument();
    });

    it('render goals list', async () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Goals')).toBeInTheDocument();
      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      exampleProject1.goals.forEach((bullet) => {
        expect(res.map((item) => item.value)).toContain(bullet.detail);
      });
    });

    it('render features list', async () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Features')).toBeInTheDocument();
      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      exampleProject1.features.forEach((bullet) => {
        expect(res.map((item) => item.value)).toContain(bullet.detail);
      });
    });

    it('render other constraints list', async () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Other Constraints')).toBeInTheDocument();
      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      exampleProject1.otherConstraints.forEach((bullet) => {
        expect(res.map((item) => item.value)).toContain(bullet.detail);
      });
    });

    it('render rules list', async () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Goals')).toBeInTheDocument();
      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      expect(res.map((item) => item.value)).toEqual(expect.arrayContaining(exampleProject1.rules));
    });

    it('render title of ChangesList', () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Changes')).toBeInTheDocument();
    });

    it('render title of ProjectEditWorkPackagesList', () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Work Packages')).toBeInTheDocument();
    });

    it('renders save and cancel buttons', () => {
      mockHook(false, false, users);
      renderComponent();

      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  it.skip('renders the loaded project', () => {
    // mockHook(false, false);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Impact Attenuator')).toBeInTheDocument();
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Duration:')).toBeInTheDocument();
    expect(screen.getByText('Progress:')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeEnabled();
  });

  it.skip('handles the error with message', () => {
    // mockHook(false, true, undefined, new Error('404 could not find the requested work package'));
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested project')).toBeInTheDocument();
  });

  it.skip('handles the error with no message', () => {
    // mockHook(false, true);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('project')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
