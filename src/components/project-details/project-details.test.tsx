/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { exampleProject1 } from 'utils';
import ProjectDetails from './project-details';

it('Renders title', () => {
  render(<ProjectDetails project={exampleProject1} />);
  const titleElement = screen.getByText(/Project Details/i);
  expect(titleElement).toBeInTheDocument();
});
