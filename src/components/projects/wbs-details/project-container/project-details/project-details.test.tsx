/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { fullNamePipe, wbsPipe, listPipe } from '../../../../../shared/pipes';
import {
  exampleProject1,
  exampleProject2,
  exampleProject3
} from '../../../../../test-support/test-data/projects.stub';
import AppContext from '../../../../app/app-context/app-context';
import ProjectDetails from './project-details';

describe('project details component', () => {
  it('Renders title', () => {
    render(
      <AppContext>
        <ProjectDetails project={exampleProject1} />
      </AppContext>
    );
    const titleElement = screen.getByText('Project Details');
    expect(titleElement).toBeInTheDocument();
  });

  it('Renders WBS#', () => {
    render(
      <AppContext>
        <ProjectDetails project={exampleProject2} />
      </AppContext>
    );
    const projectElement = screen.getByText(wbsPipe(exampleProject2.wbsNum), { exact: false });
    expect(projectElement).toBeInTheDocument();
  });

  it('Renders project lead', () => {
    render(
      <AppContext>
        <ProjectDetails project={exampleProject3} />
      </AppContext>
    );
    const projectNameElement = screen.getByText(
      listPipe(exampleProject3.projectLead, fullNamePipe),
      {
        exact: false
      }
    );
    expect(projectNameElement).toBeInTheDocument();
  });

  it.todo('test display dates');

  it.todo('test display duration');
});
