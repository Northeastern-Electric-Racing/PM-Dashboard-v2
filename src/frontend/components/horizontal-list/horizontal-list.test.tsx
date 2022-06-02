/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import HorizontalList from './horizontal-list';
import { useTheme } from '../../../services/theme.hooks';
import { Theme } from '../../../shared/types';

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

describe('Horizontal List Component', () => {
  beforeEach(() => mockHook());

  it('renders the title', () => {
    render(<HorizontalList title={'test'} headerRight={<></>} items={[<>one</>, <>two</>]} />);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders all the listed items', () => {
    render(<HorizontalList title={'test'} headerRight={<></>} items={[<>one</>, <>two</>]} />);

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });
});
