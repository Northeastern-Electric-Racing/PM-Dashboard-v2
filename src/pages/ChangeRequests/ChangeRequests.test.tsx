import { render, screen } from '@testing-library/react';
import ChangeRequests from './ChangeRequests';

test('Renders title', () => {
  render(<ChangeRequests />);
  const titleElement = screen.getByText(/Change Requests/i);
  expect(titleElement).toBeInTheDocument();
});
