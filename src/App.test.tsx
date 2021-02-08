/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders projects table title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Projects Table container/i);
  expect(linkElement).toBeInTheDocument();
});
