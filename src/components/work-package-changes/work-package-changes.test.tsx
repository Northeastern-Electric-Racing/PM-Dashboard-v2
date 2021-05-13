/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import WorkPackageChanges from './work-package-changes';
import { exampleWorkPackage2 } from 'utils';

describe('Rendering Work Package Changes Component', () => {
  it('renders the component title', () => {
    render(<WorkPackageChanges workPackage={exampleWorkPackage2} />);

    expect(screen.getByText(`Changes`)).toBeInTheDocument();
  });

  it('renders all the changes', () => {
    render(<WorkPackageChanges workPackage={exampleWorkPackage2} />);

    expect(
      screen.getByText('[#1] Decreased duration from 10 weeks to 7 weeks.')
    ).toBeInTheDocument();
    expect(screen.getByText('[#54] Added "jet fuel burns hot" bullet.')).toBeInTheDocument();
  });
});
