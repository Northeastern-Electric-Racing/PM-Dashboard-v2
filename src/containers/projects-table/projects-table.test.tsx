/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { act, render, screen, waitFor } from '@testing-library/react';
import ProjectsTable from './projects-table';

// Mock the server endpoint(s) that the component will hit
const server = setupServer(
  rest.get('/.netlify/functions/projects', (req, res, ctx) => {
    return res(ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('projects table component', () => {
  it('Renders title', async () => {
    await act(async () => {
      render(<ProjectsTable />);
      await waitFor(() => screen.getByText('Projects Table container', { exact: false }));
    });
    const titleElement = screen.getByText('Projects Table container', { exact: false });
    expect(titleElement).toBeInTheDocument();
  });

  // mock the api, consider using msw as suggested in the testing library docs

  // test for api returning error

  // test for api returning nothing

  // test for api returning stuff

  // test for clicking on a column for sort

  // test for a basic normal case

  // https://testing-library.com/docs/react-testing-library/example-intro
});
