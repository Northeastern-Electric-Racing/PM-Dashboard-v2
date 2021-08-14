/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { exampleProject1 } from '../../../../../test-support/test-data/projects.stub';
import ProjectRules from './project-rules';

describe('Rendering Work Package Rules Component', () => {
  it('renders the component title', () => {
    render(<ProjectRules rules={exampleProject1.rules} />);

    expect(screen.getByText(`Rules`)).toBeInTheDocument();
  });

  it('renders all the listed rules', () => {
    render(<ProjectRules rules={exampleProject1.rules} />);

    expect(screen.getByText('T12.3.2')).toBeInTheDocument();
    expect(screen.getByText('T8.2.6')).toBeInTheDocument();
  });
});
