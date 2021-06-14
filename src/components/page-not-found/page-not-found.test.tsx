import { render, screen } from '@testing-library/react';
import { PageNotFound } from './page-not-found';

test('404 rendered', () => {
  render(<PageNotFound />);
  const title = screen.getByText(/404/i);
  expect(title).toBeInTheDocument();
});
