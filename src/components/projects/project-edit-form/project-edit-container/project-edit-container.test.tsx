import { UseQueryResult } from 'react-query';
import { Project } from 'utils';
import { render, screen, routerWrapperBuilder } from '../../../../test-support/test-utils';
import { mockUseQueryResult } from '../../../../test-support/test-data/test-utils.stub';
import { exampleWbsProject1 } from '../../../../test-support/test-data/wbs-numbers.stub';
import { exampleProject1 } from '../../../../test-support/test-data/projects.stub';
import { useSingleProject } from '../../../../services/projects.hooks';
import ProjectEditContainer from './project-edit-container';
import { wbsPipe } from '../../../../shared/pipes';

// jest.mock('../../../../services/projects.hooks');

const mockedUseSingleProject = useSingleProject as jest.Mock<UseQueryResult<Project>>;

// const mockHook = (isLoading: boolean, isError: boolean, data?: Project, error?: Error) => {
//   mockedUseSingleProject.mockReturnValue(
//     mockUseQueryResult<Project>(isLoading, isError, data, error)
//   );
// };

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <ProjectEditContainer
        wbsNum={exampleWbsProject1}
        data={exampleProject1}
        setEditMode={() => null}
      />
    </RouterWrapper>
  );
};

describe('test suite for ProjectEditContainer', () => {
  describe('rendering subcomponents of ProjectEditContainer', () => {
    it('renders title', () => {
      renderComponent();

      expect(
        screen.getByText(`${wbsPipe(exampleWbsProject1)} - ${exampleProject1.name}`)
      ).toBeInTheDocument();
    });

    it('render title of ProjectEditDetails', () => {
      renderComponent();

      expect(screen.getByText('Project Details (EDIT)')).toBeInTheDocument();
    });

    it('render title of ProjectEditSummary', () => {
      renderComponent();

      expect(screen.getByText('Project Summary')).toBeInTheDocument();
    });

    it('render goals list', async () => {
      renderComponent();

      expect(screen.getByText('Goals')).toBeInTheDocument();
      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      exampleProject1.goals.forEach((bullet) => {
        expect(res.map((item) => item.value)).toContain(bullet.detail);
      });
    });

    it('render features list', async () => {
      renderComponent();

      expect(screen.getByText('Features')).toBeInTheDocument();
      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      exampleProject1.features.forEach((bullet) => {
        expect(res.map((item) => item.value)).toContain(bullet.detail);
      });
    });

    it('render other constraints list', async () => {
      renderComponent();

      expect(screen.getByText('Other Constraints')).toBeInTheDocument();
      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      exampleProject1.otherConstraints.forEach((bullet) => {
        expect(res.map((item) => item.value)).toContain(bullet.detail);
      });
    });

    it('render rules list', async () => {
      renderComponent();

      expect(screen.getByText('Goals')).toBeInTheDocument();
      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      expect(res.map((item) => item.value)).toEqual(expect.arrayContaining(exampleProject1.rules));
    });

    it('render title of ChangesList', () => {
      renderComponent();

      expect(screen.getByText('Changes')).toBeInTheDocument();
    });

    it('render title of ProjectEditWorkPackagesList', () => {
      renderComponent();

      expect(screen.getByText('Work Packages')).toBeInTheDocument();
    });

    it('renders save and cancel buttons', () => {
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
