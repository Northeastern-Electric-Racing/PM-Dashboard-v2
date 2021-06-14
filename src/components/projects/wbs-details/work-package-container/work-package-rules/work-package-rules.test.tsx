/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { exampleWorkPackage2 } from '../../../../../test-support/test-data/work-packages.stub';
import WorkPackageRules from './work-package-rules';

describe('Rendering Work Package Rules Component', () => {
  it('renders the component title', () => {
    render(<WorkPackageRules workPackage={exampleWorkPackage2} />);

    expect(screen.getByText(`Rules`)).toBeInTheDocument();
  });

  it('renders all the listed rules', () => {
    render(<WorkPackageRules workPackage={exampleWorkPackage2} />);

    expect(screen.getByText('T12.3.2')).toBeInTheDocument();
    expect(screen.getByText('T8.2.6')).toBeInTheDocument();
  });
});
