/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import ChangeRequests from './change-requests';

test('Renders title', () => {
  render(<ChangeRequests />);
  const titleElement = screen.getByText(/Change Requests Page/i);
  expect(titleElement).toBeInTheDocument();
});
