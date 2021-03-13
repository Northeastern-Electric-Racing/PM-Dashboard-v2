/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Project } from 'utils';
import { renderWithRouter } from '../../shared/test-utils';
import Projects from './projects';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent: Function = (routeOverride: string) => {
  const renderRoute: string = routeOverride || '/projects';
  renderWithRouter(Projects, { route: renderRoute });
};

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

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get(endpointURL, (req, res, ctx) => {
    return res(ctx.json(exampleAllProjects));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('projects page component', () => {
  test('renders the page title', () => {
    renderComponent();
    expect(screen.getByText(/Projects Page/i)).toBeInTheDocument();
  });

  test('renders the projects table page title', () => {
    renderComponent();
    expect(screen.getByText(/Projects Table/i)).toBeInTheDocument();
  });

  test('renders the wbs element number title', () => {
    const wbsNumToRender: string = '1.8.1';
    renderComponent(`/projects/${wbsNumToRender}`);
    expect(screen.getByText(wbsNumToRender, { exact: false })).toBeInTheDocument();
  });

  test('renders 1.1.0 as a project', () => {
    const wbsNumToRender: string = '1.1.0';
    renderComponent(`/projects/${wbsNumToRender}`);
    expect(screen.getByText(`Project ${wbsNumToRender}`)).toBeInTheDocument();
  });

  test('renders 2.18.7 as a work package', () => {
    const wbsNumToRender: string = '2.18.7';
    renderComponent(`/projects/${wbsNumToRender}`);
    expect(screen.getByText(`Work Package ${wbsNumToRender}`)).toBeInTheDocument();
  });
});
