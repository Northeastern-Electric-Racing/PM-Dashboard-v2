import { render, screen } from '@testing-library/react';
import WorkPackages from './WorkPackages';

test('Renders title', () => {
  render(<WorkPackages />);
  const titleElement = screen.getByText(/Work Packages/i);
  expect(titleElement).toBeInTheDocument();
});
