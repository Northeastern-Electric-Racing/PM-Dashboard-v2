/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { exampleProject1, exampleProject2, exampleProject3 } from 'utils';
import ProjectDetails from './project-details';

describe('project details component', () => {
  it('Renders title', () => {
    render(<ProjectDetails project={exampleProject1} />);
    const titleElement = screen.getByText('Project Details');
    expect(titleElement).toBeInTheDocument();
  });

  it('Renders WBS#', () => {
    render(<ProjectDetails project={exampleProject2} />);
    const projectElement = screen.getByText(
      `${exampleProject2.wbsNum.area}.${exampleProject2.wbsNum.project}.${exampleProject2.wbsNum.workPackage}`
    );
    expect(projectElement).toBeInTheDocument();
  });

  it('Renders project lead', () => {
    render(<ProjectDetails project={exampleProject3} />);
    const projectNameElement = screen.getByText(
      `${exampleProject3.projectLead.firstName} ${exampleProject3.projectLead.lastName}`
    );
    expect(projectNameElement).toBeInTheDocument();
  });
});
