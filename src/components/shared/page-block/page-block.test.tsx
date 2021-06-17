/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render } from '@testing-library/react';
import PageBlock from './page-block';

const renderComponent = () => {
  return render(<PageBlock title={'test'} headerRight={<>hi</>} body={<>hello</>} />);
};

describe('card component', () => {
  it('renders without error', () => {
    renderComponent();
  });

  it('renders title', () => {
    const { getByText } = renderComponent();

    expect(getByText('test')).toBeInTheDocument();
  });

  it('renders header right', () => {
    const { getByText } = renderComponent();

    expect(getByText('hi')).toBeInTheDocument();
  });

  it('renders body', () => {
    const { getByText } = renderComponent();

    expect(getByText('hello')).toBeInTheDocument();
  });
});
