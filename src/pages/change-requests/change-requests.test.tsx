import { render, screen } from '@testing-library/react';
import ChangeRequests from './change-requests';

test('Renders title', () => {
  render(<ChangeRequests />);
  const titleElement = screen.getByText(/Change Requests Page/i);
  expect(titleElement).toBeInTheDocument();
});
