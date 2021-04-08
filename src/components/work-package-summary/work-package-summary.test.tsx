/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import WorkPackageSummary from './work-package-summary';
import {
    exampleWorkPackage1,
    exampleWorkPackage2,
    exampleWorkPackage3
} from 'utils';

test('Renders title', () => {
    render(<WorkPackageSummary workPackage={exampleWorkPackage1} />);
  });