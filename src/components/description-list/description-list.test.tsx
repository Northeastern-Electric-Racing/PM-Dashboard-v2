/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import DescriptionList from './description-list';
import { exampleWorkPackage2, WorkPackage } from 'utils';

describe('Rendering Description List Component', () => {
  test('Rendering example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    render(<DescriptionList workPackage={wp} />);
    expect(screen.getByText(`Description`)).toBeInTheDocument();
    expect(
      screen.getByText(
        'Build a test procedure for destructively measuring the shear strength of various adhesives interacting with foam and steel plates'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('Design and manufacture test fixtures to perform destructive testing')
    ).toBeInTheDocument();
    expect(screen.getByText('Write a report to summarize findings')).toBeInTheDocument();
  });
});
