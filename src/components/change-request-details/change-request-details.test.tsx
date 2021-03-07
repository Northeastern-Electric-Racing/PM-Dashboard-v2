/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { exampleStandardChangeRequest } from 'utils';
import ChangeRequestDetails from './change-request-details';

test('Renders title', () => {
  render(<ChangeRequestDetails changeRequest={exampleStandardChangeRequest} />);
  const titleElement = screen.getByText(/Change Request/i);
  expect(titleElement).toBeInTheDocument();
});
