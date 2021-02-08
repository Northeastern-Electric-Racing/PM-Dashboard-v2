/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { ChangeRequest } from '../../types/change-request-types';
import ChangeRequestDetails from './change-request-details';

test('Renders title', () => {
  const exChangeRequest: ChangeRequest = { submitter: 'Matt McCauley', type: 'Delay' };
  render(<ChangeRequestDetails changeRequest={exChangeRequest} />);
  const titleElement = screen.getByText(/Change Request Details/i);
  expect(titleElement).toBeInTheDocument();
});
