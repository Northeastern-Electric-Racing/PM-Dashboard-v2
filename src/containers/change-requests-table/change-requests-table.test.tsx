import { render, screen } from '@testing-library/react';
import ChangeRequestsTable from './change-requests-table';

test('Renders title', () => {
  render(<ChangeRequestsTable />);
  const titleElement = screen.getByText(/Change Requests Table/i);
  expect(titleElement).toBeInTheDocument();
});
