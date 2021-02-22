/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import ChangeRequestsTable from './change-requests-table';

test('Renders title', () => {
  render(<ChangeRequestsTable />);
  const titleElement = screen.getByText(/Change Requests Table/i);
  expect(titleElement).toBeInTheDocument();
});
