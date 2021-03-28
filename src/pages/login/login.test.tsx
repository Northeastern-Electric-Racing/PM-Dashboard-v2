/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import Login from './login';

test('Renders title', () => {
  render(<Login />);
  const titleElement = screen.getByText(/Login Page/i);
  expect(titleElement).toBeInTheDocument();
});
