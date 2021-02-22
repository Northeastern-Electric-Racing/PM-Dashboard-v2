/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { Project } from 'utils';
import ProjectDetails from './project-details';

it('Renders title', () => {
  const exProject: Project = {
    wbsNum: '1.1.0',
    name: 'Impact Attenuator',
    projectLead: 'Person Allen',
    projectManager: 'Person Gilbert',
    duration: 2
  };
  render(<ProjectDetails project={exProject} />);
  const titleElement = screen.getByText(/Project Details/i);
  expect(titleElement).toBeInTheDocument();
});
