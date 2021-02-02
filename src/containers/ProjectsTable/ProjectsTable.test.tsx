import { render, screen } from '@testing-library/react';
import ProjectsTable from './ProjectsTable';

test('Renders title', () => {
  render(<ProjectsTable />);
  const titleElement = screen.getByText(/Projects Table/i);
  expect(titleElement).toBeInTheDocument();
});
