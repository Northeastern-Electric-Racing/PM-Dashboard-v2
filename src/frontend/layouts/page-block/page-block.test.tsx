/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render } from '@testing-library/react';
import { useTheme } from '../../../services/theme.hooks';
import { Theme } from '../../../shared/types';
import PageBlock from './page-block';

jest.mock('../../../services/theme.hooks');
const mockTheme = useTheme as jest.Mock<Theme>;

const mockHook = () => {
  mockTheme.mockReturnValue({
    name: 'light',
    bgColor: '#ffffff',
    cardBg: 'light',
    cardBorder: 'dark'
  });
};

const renderComponent = () => {
  return render(<PageBlock title={'test'} headerRight={<>hi</>} body={<>hello</>} />);
};

describe('card component', () => {
  beforeEach(() => mockHook());

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
