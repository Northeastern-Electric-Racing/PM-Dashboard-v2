/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import WorkPackageChanges from './work-package-changes';
import { renderWithRouter } from '../../../../../test-support/test-utils';
import { exampleWorkPackage2 } from '../../../../../test-support/test-data/work-packages.stub';

describe('Rendering Work Package Changes Component', () => {
  it('renders the component title', () => {
    renderWithRouter(<WorkPackageChanges workPackage={exampleWorkPackage2} />, {});

    expect(screen.getByText(`Changes`)).toBeInTheDocument();
  });

  it('renders all the changes', () => {
    renderWithRouter(<WorkPackageChanges workPackage={exampleWorkPackage2} />, {});

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText(/Decreased duration from 10 weeks to 7 weeks./i)).toBeInTheDocument();
    expect(screen.getByText('#54')).toBeInTheDocument();
    expect(screen.getByText(/Added "jet fuel burns hot" bullet./i)).toBeInTheDocument();
  });
});
