/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { UseQueryResult } from 'react-query';
import { Project, WorkPackage } from 'utils/src';
import { fireEvent, render, screen, waitFor, wbsRegex } from '../../../test-support/test-utils';
import { fullNamePipe, wbsPipe, listPipe } from '../../../shared/pipes';
import { useAllProjects } from '../../../services/projects.hooks';
import {
  exampleAllProjects,
  exampleProject1,
  exampleProject2,
  exampleProject3,
  exampleProject4,
  exampleProject5
} from '../../../test-support/test-data/projects.stub';
import { mockUseQueryResult } from '../../../test-support/test-data/test-utils.stub';
import ProjectsTable, { filterProjects } from './projects-table';

jest.mock('../../../services/projects.hooks');

const mockedUseAllProjects = useAllProjects as jest.Mock<UseQueryResult<Project[]>>;

const mockHook = (isLoading: boolean, isError: boolean, data?: Project[], error?: Error) => {
  mockedUseAllProjects.mockReturnValue(
    mockUseQueryResult<Project[]>(isLoading, isError, data, error)
  );
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  render(<ProjectsTable />);
};

describe('projects table component', () => {
  it('renders the title', async () => {
    mockHook(false, false, []);
    renderComponent();

    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders the loading indicator', () => {
    mockHook(true, false);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('handles the api throwing an error', async () => {
    mockHook(false, true);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    // expect(screen.getByText('Projects Table container', { exact: false })).toBeInTheDocument();
    // expect(screen.getByText('No projects to display', { exact: false })).toBeInTheDocument();
  });

  it('handles the api returning an empty array', async () => {
    mockHook(false, false, []);
    renderComponent();

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('No projects to display', { exact: false })).toBeInTheDocument();
  });

  it('handles the api returning a normal array of projects', async () => {
    mockHook(false, false, exampleAllProjects);
    renderComponent();
    await waitFor(() => screen.getByText(wbsPipe(exampleAllProjects[0].wbsNum)));

    expect(
      screen.getByText(
        exampleAllProjects[1].workPackages.reduce(
          (tot: number, cur: WorkPackage) => tot + cur.duration,
          0
        ) + ' weeks'
      )
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(listPipe(exampleAllProjects[2].projectLead, fullNamePipe))[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText(fullNamePipe(exampleAllProjects[3].projectManager))
    ).toBeInTheDocument();
    expect(screen.getByText(wbsPipe(exampleAllProjects[4].wbsNum))).toBeInTheDocument();

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.queryByText('No projects to display', { exact: false })).not.toBeInTheDocument();
  });

  it.skip('handles sorting and reverse sorting the table by wbs num', async () => {
    mockHook(false, false, exampleAllProjects);
    renderComponent();
    await waitFor(() => screen.getByText(wbsPipe(exampleAllProjects[0].wbsNum)));

    const column: string = 'WBS #';
    const expectedWbsOrder: string[] = exampleAllProjects.map((prj: Project) =>
      wbsPipe(prj.wbsNum)
    );

    // Default sort is wbs ascending
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(expectedWbsOrder);

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(
      expectedWbsOrder.reverse()
    );
  });

  it('checking if project filtering with no filters works as expected', async () => {
    expect(filterProjects(exampleAllProjects, '', '', '', '')).toStrictEqual(exampleAllProjects);
  });

  it('checking if project filtering with car num works as expected', async () => {
    const answer1: Project[] = [exampleProject1, exampleProject2, exampleProject3];
    const answer2: Project[] = [exampleProject4, exampleProject5];
    expect(filterProjects(exampleAllProjects, '1', '', '', '')).toStrictEqual(answer1);
    expect(filterProjects(exampleAllProjects, '2', '', '', '')).toStrictEqual(answer2);
  });

  it('checking if project filtering with status works as expected', async () => {
    const answer_active: Project[] = [exampleProject1, exampleProject3];
    const answer_inactive: Project[] = [exampleProject2, exampleProject4];
    const answer_complete: Project[] = [exampleProject5];
    expect(filterProjects(exampleAllProjects, '', 'Active', '', '')).toStrictEqual(answer_active);
    expect(filterProjects(exampleAllProjects, '', 'Inactive', '', '')).toStrictEqual(
      answer_inactive
    );
    expect(filterProjects(exampleAllProjects, '', 'Complete', '', '')).toStrictEqual(
      answer_complete
    );
  });

  it('checking if project filtering with project lead works as expected', async () => {
    const answer1: Project[] = [exampleProject1, exampleProject2, exampleProject5];
    const answer2: Project[] = [exampleProject3, exampleProject4];
    expect(filterProjects(exampleAllProjects, '', '', 'Amy Smith', '')).toStrictEqual(answer1);
    expect(filterProjects(exampleAllProjects, '', '', 'Joe Blow', '')).toStrictEqual(answer2);
  });
  it('checking if project filtering with project manager works as expected', async () => {
    const answer1: Project[] = [exampleProject1];
    const answer2: Project[] = [exampleProject2, exampleProject3, exampleProject5];
    const answer3: Project[] = [exampleProject4];
    expect(filterProjects(exampleAllProjects, '', '', '', 'Joe Blow')).toStrictEqual(answer1);
    expect(filterProjects(exampleAllProjects, '', '', '', 'Rachel Barmatha')).toStrictEqual(
      answer2
    );
    expect(filterProjects(exampleAllProjects, '', '', '', 'Joe Shmoe')).toStrictEqual(answer3);
  });
});
