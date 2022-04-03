/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { exampleProject1 } from '../../../../../test-support/test-data/projects.stub';
import { render, screen } from '../../../../../test-support/test-utils';
import ProjectEditSummary from './project-edit-summary';

const proj = exampleProject1;

describe('test suite for ProjectEditSummary', () => {
  it('render title', () => {
    render(<ProjectEditSummary project={proj} />);

    expect(screen.getByText('Project Summary')).toBeInTheDocument();
  });

  it('render summary text box', () => {
    render(<ProjectEditSummary project={proj} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(proj.summary)).toBeInTheDocument();
  });
});
