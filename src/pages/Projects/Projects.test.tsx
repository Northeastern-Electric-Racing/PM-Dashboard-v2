import { render, screen } from '@testing-library/react';
import Projects from './Projects';

test('Renders title', () => {
  render(<Projects />);
  const titleElement = screen.getByText(/Projects/i);
  expect(titleElement).toBeInTheDocument();
});
