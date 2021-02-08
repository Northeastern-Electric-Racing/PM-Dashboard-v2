import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders projects table title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Projects Table container/i);
  expect(linkElement).toBeInTheDocument();
});
