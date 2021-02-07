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
