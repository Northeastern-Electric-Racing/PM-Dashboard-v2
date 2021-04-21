/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProjectsTable from './projects-table';
import {
  exampleProject1,
  exampleProject2,
  exampleProject3,
  exampleProject4,
  exampleProject5,
  exampleAllProjects,
  WorkPackage,
  Project
} from 'utils';
import { wbsPipe, fullNamePipe } from '../../shared/pipes';
import { wbsRegex } from '../../shared/test-utils';

const endpointURL: string = '/.netlify/functions/projects';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(endpointURL, (req, res, ctx) => {
    return res(ctx.json(exampleAllProjects));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('projects table component', () => {
  it('renders the title', async () => {
    render(<ProjectsTable />);

    expect(screen.getByText('Projects Table container', { exact: false })).toBeInTheDocument();
  });

  it('handles the api throwing an error', async () => {
    server.use(
      rest.get(endpointURL, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<ProjectsTable />);

    expect(screen.getByText('Projects Table container', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('No projects to display', { exact: false })).toBeInTheDocument();
  });

  it('handles the api returning an empty array', async () => {
    server.use(
      rest.get(endpointURL, (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    render(<ProjectsTable />);

    expect(screen.getByText('Projects Table container', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('No projects to display', { exact: false })).toBeInTheDocument();
  });

  it('handles the api returning a normal array of projects', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(wbsPipe(exampleProject1.wbsNum)));

    expect(
      screen.getByText(
        exampleProject2.workPackages.reduce(
          (tot: number, cur: WorkPackage) => tot + cur.duration,
          0
        ) + ' weeks'
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText(fullNamePipe(exampleProject3.projectLead))[0]).toBeInTheDocument();
    expect(screen.getByText(fullNamePipe(exampleProject4.projectManager))).toBeInTheDocument();
    expect(screen.getByText(wbsPipe(exampleProject5.wbsNum))).toBeInTheDocument();

    expect(screen.getByText('Projects Table container', { exact: false })).toBeInTheDocument();
    expect(screen.queryByText('No projects to display', { exact: false })).not.toBeInTheDocument();
  });

  it.skip('handles sorting and reverse sorting the table by wbs num', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(wbsPipe(exampleProject1.wbsNum)));

    const column: string = 'WBS #';
    const expectedWbsOrder: string[] = [
      exampleProject1,
      exampleProject2,
      exampleProject3,
      exampleProject4,
      exampleProject5
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    // Default sort is wbs ascending
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(expectedWbsOrder);

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(
      expectedWbsOrder.reverse()
    );
  });

  it('handles sorting and reverse sorting the table by project name', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(wbsPipe(exampleProject1.wbsNum)));

    const column: string = 'Name';
    const expectedWbsOrder: string[] = [
      exampleProject3,
      exampleProject2,
      exampleProject1,
      exampleProject4,
      exampleProject5
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(
      expectedWbsOrder.reverse()
    );

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(expectedWbsOrder.reverse());
  });

  it('handles sorting and reverse sorting the table by project lead', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(wbsPipe(exampleProject1.wbsNum)));

    const column: string = 'Project Lead';
    const expectedWbsOrder: string[] = [
      exampleProject1,
      exampleProject2,
      exampleProject5,
      exampleProject3,
      exampleProject4
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele: HTMLElement) => ele.innerHTML)).not.toEqual(expectedWbsOrder);

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(expectedWbsOrder);
  });

  it('handles sorting and reverse sorting the table by project manager', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(wbsPipe(exampleProject1.wbsNum)));

    const column: string = 'Project Manager';
    const expectedWbsOrder: string[] = [
      exampleProject1,
      exampleProject4,
      exampleProject2,
      exampleProject3,
      exampleProject5
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele: HTMLElement) => ele.innerHTML)).not.toEqual(expectedWbsOrder);

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(expectedWbsOrder);
  });

  it('handles sorting and reverse sorting the table by duration', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(wbsPipe(exampleProject1.wbsNum)));

    const column: string = 'Duration';
    const expectedWbsOrder: string[] = [
      exampleProject2,
      exampleProject5,
      exampleProject3,
      exampleProject4,
      exampleProject1
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(
      expectedWbsOrder.reverse()
    );

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(expectedWbsOrder.reverse());
  });

  // test for a basic normal case

  // https://testing-library.com/docs/react-testing-library/example-intro
});
