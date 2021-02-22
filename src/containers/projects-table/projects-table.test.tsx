/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProjectsTable from './projects-table';
import { Project } from 'utils';

// Build example test data
const exampleProject1: Project = {
  wbsNum: '1.1.0',
  name: 'Impact Attenuator',
  projectLead: 'Person Allen',
  projectManager: 'Person Gilbert',
  duration: 2
};

const exampleProject2: Project = {
  wbsNum: '1.2.0',
  name: 'Bodywork',
  projectLead: 'Person Richard',
  projectManager: 'Person David',
  duration: 4
};

const exampleProject3: Project = {
  wbsNum: '1.12.0',
  name: 'Battery Box',
  projectLead: 'Person Karen',
  projectManager: 'Person Solomon',
  duration: 3
};

const exampleProject4: Project = {
  wbsNum: '2.6.0',
  name: 'Motor Controller Integration',
  projectLead: 'Person Emily',
  projectManager: 'Person Zoe',
  duration: 9
};

const exampleProject5: Project = {
  wbsNum: '2.8.0',
  name: 'Driver IO',
  projectLead: 'Person George',
  projectManager: 'Person William',
  duration: 12
};

const exampleAllProjects: Project[] = [
  exampleProject1,
  exampleProject2,
  exampleProject3,
  exampleProject4,
  exampleProject5
];

const endpointURL: string = '/.netlify/functions/projects';
const wbsRegex: RegExp = /[1-2]\.([1-9]{1}([0-9]{1})?)\.[0-9]{1,2}/;

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
    await waitFor(() => screen.getByText(exampleProject1.wbsNum));

    expect(screen.getByText(exampleProject2.duration + ' weeks')).toBeInTheDocument();
    expect(screen.getByText(exampleProject3.projectLead)).toBeInTheDocument();
    expect(screen.getByText(exampleProject4.projectManager)).toBeInTheDocument();
    expect(screen.getByText(exampleProject5.wbsNum)).toBeInTheDocument();

    expect(screen.getByText('Projects Table container', { exact: false })).toBeInTheDocument();
    expect(screen.queryByText('No projects to display', { exact: false })).not.toBeInTheDocument();
  });

  it.skip('handles sorting and reverse sorting the table by wbs num', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(exampleProject1.wbsNum));

    const column: string = 'WBS #';
    const expectedWbsOrder: string[] = [
      exampleProject1.wbsNum,
      exampleProject2.wbsNum,
      exampleProject3.wbsNum,
      exampleProject4.wbsNum,
      exampleProject5.wbsNum
    ];

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
    await waitFor(() => screen.getByText(exampleProject1.wbsNum));

    const column: string = 'Name';
    const expectedWbsOrder: string[] = [
      exampleProject3.wbsNum,
      exampleProject2.wbsNum,
      exampleProject5.wbsNum,
      exampleProject1.wbsNum,
      exampleProject4.wbsNum
    ];

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
    await waitFor(() => screen.getByText(exampleProject1.wbsNum));

    const column: string = 'Project Lead';
    const expectedWbsOrder: string[] = [
      exampleProject1.wbsNum,
      exampleProject4.wbsNum,
      exampleProject5.wbsNum,
      exampleProject3.wbsNum,
      exampleProject2.wbsNum
    ];

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(
      expectedWbsOrder.reverse()
    );

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(expectedWbsOrder.reverse());
  });

  it('handles sorting and reverse sorting the table by project manager', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(exampleProject1.wbsNum));

    const column: string = 'Project Manager';
    const expectedWbsOrder: string[] = [
      exampleProject2.wbsNum,
      exampleProject1.wbsNum,
      exampleProject3.wbsNum,
      exampleProject5.wbsNum,
      exampleProject4.wbsNum
    ];

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(
      expectedWbsOrder.reverse()
    );

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele: HTMLElement) => ele.innerHTML)).toEqual(expectedWbsOrder.reverse());
  });

  it.skip('handles sorting and reverse sorting the table by duration', async () => {
    render(<ProjectsTable />);
    await waitFor(() => screen.getByText(exampleProject1.wbsNum));

    const column: string = 'Duration';
    const expectedWbsOrder: string[] = [
      exampleProject5.wbsNum,
      exampleProject4.wbsNum,
      exampleProject2.wbsNum,
      exampleProject3.wbsNum,
      exampleProject1.wbsNum
    ];

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
