/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { WorkPackage } from 'utils';
import { wbsPipe } from '../../shared/pipes';
import { exampleWorkPackage2 } from '../../test-support/test-data/work-packages.stub';
import WorkPackageDependencies from './work-package-dependencies';

describe('Rendering Work Packagae Dependencies Component', () => {
  test('Rendering example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    render(<WorkPackageDependencies workPackage={wp} />);
    expect(screen.getByText(`Dependencies`)).toBeInTheDocument();

    wp.dependencies.forEach(function (wbs) {
      expect(screen.getByText(`${wbsPipe(wbs)}`)).toBeInTheDocument();
    });
  });
});
