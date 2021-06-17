/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render } from '@testing-library/react';
import PageTitle from './page-title';

describe('error page', () => {
  it('renders without error', () => {
    render(<PageTitle title={'test'} />);
  });

  it('renders title', () => {
    const { getByText } = render(<PageTitle title={'test'} />);

    expect(getByText('test')).toBeInTheDocument();
  });

  it('renders when provided className', () => {
    const { getByText } = render(<PageTitle title={'test'} className={'pt-5'} />);

    expect(getByText('test')).toBeInTheDocument();
  });
});
