/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, waitFor } from '@testing-library/react';
import ProjectContainer from './project-container';

// Sets up the component under test with the desired values and renders it.
const renderComponent: () => void = () => {
  render(<ProjectContainer wbsNum={{ car: 1, project: 1, workPackage: 0 }} />);
};

describe('Rendering Project Container', () => {
  it('renders the correct data', async () => {
    renderComponent();
    expect(screen.getByText('1.1.0 - Impact Attenuator')).toBeInTheDocument();
    expect(screen.getByText('Work Packages')).toBeInTheDocument();
    expect(screen.getByText('Bodywork Concept of Design')).toBeInTheDocument();
  });
});
