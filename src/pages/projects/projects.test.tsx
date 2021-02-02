import { render, screen } from '@testing-library/react';
import Projects from './projects-page';

test('Renders title', () => {
  render(<Projects />);
  const titleElement = screen.getByText(/Projects Page/i);
  expect(titleElement).toBeInTheDocument();
});
