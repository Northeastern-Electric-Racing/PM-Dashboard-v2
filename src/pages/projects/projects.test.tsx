/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithRouter } from '../../test-support/test-utils';
import { exampleAllProjects } from '../../test-support/test-data/projects.stub';
import Projects from './projects';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent: Function = (routeOverride: string) => {
  const renderRoute: string = routeOverride || '/projects';
  renderWithRouter(Projects, { route: renderRoute });
};

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
