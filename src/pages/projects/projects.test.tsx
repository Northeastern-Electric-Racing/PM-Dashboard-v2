/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import Projects from './projects';

test('Renders title', () => {
  render(<Projects />);
  const titleElement = screen.getByText(/Projects Page/i);
  expect(titleElement).toBeInTheDocument();
});
