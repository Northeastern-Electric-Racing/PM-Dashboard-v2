/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { Project } from 'utils';
import ProjectDetails from './project-details';

// Build example test data
const exampleProject1: Project = {
  wbsNum: '1.1.0',
  name: 'Impact Attenuator',
  projectLead: 'Person Allen',
  projectManager: 'Person Gilbert',
  duration: 2
};

describe('project details component', () => {
  it('Renders title', () => {
    render(<ProjectDetails project={exampleProject1} />);
    const titleElement = screen.getByText('Project Details');
    expect(titleElement).toBeInTheDocument();
  });

  it('Renders WBS#', () => {
    render(<ProjectDetails project={exampleProject1} />);
    const projectElement = screen.getByText(`${exampleProject1.wbsNum}`);
    expect(projectElement).toBeInTheDocument();
  });

  it('Renders project lead', () => {
    render(<ProjectDetails project={exampleProject1} />);
    const projectNameElement = screen.getByText(`${exampleProject1.projectLead}`);
    expect(projectNameElement).toBeInTheDocument();
  });
});
