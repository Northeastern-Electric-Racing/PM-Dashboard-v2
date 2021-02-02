import { render, screen } from '@testing-library/react';
import Projects from './projects';

test('Renders title', () => {
  render(<Projects />);
  const titleElement = screen.getByText(/Projects Page/i);
  expect(titleElement).toBeInTheDocument();
});
