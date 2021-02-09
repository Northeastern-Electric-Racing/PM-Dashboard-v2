/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import ProjectsTable from './projects-table';

test('Renders title', () => {
  render(<ProjectsTable />);
  const titleElement = screen.getByText(/Projects Table/i);
  expect(titleElement).toBeInTheDocument();
});

// mock the api, consider using msw as suggested in the testing library docs

// test for api returning error

// test for api returning nothing

// test for api returning stuff

// test for clicking on a column for sort

// test for a basic normal case

// https://testing-library.com/docs/react-testing-library/example-intro
