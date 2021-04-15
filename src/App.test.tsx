/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

it('renders nav links', () => {
  render(<App />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  expect(screen.getByText('Changes')).toBeInTheDocument();
});

it('can navigate to projects page', () => {
  render(<App />);
  const homeEle: HTMLElement = screen.getByText('Home!');
  expect(homeEle).toBeInTheDocument();
  fireEvent.click(screen.getByText('Projects'));
  expect(homeEle).not.toBeInTheDocument();
  expect(screen.getByText(/Projects Page/i)).toBeInTheDocument();
});
