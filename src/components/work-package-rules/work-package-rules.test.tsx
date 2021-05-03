/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import WorkPackageRules from './work-package-rules';
import { exampleWorkPackage2, WorkPackage } from 'utils';

describe('Rendering Work Package Rules Component', () => {
  test('Rendering example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    render(<WorkPackageRules workPackage={wp} />);
    expect(screen.getByText(`Rules`)).toBeInTheDocument();
    expect(screen.getByText('T12.3.2')).toBeInTheDocument();
    expect(screen.getByText('T8.2.6')).toBeInTheDocument();
  });
});
