/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import WorkPackageChanges from './work-package-changes';
import { exampleWorkPackage2, WorkPackage } from 'utils';

describe('Rendering Work Package Changes Component', () => {
  test('Rendering example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    render(<WorkPackageChanges workPackage={wp} />);
    expect(screen.getByText(`Changes`)).toBeInTheDocument();
    expect(
      screen.getByText('1. [#1] Decreased duration from 10 weeks to 7 weeks.')
    ).toBeInTheDocument();
    expect(screen.getByText('2. [#54] Added "jet fuel burns hot" bullet.')).toBeInTheDocument();
  });
});