/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { useTheme } from '../../../services/theme.hooks';
import themes from '../../../shared/themes';
import { Theme } from '../../../shared/types';
import BulletList from './bullet-list';

jest.mock('../../../services/theme.hooks');
const mockTheme = useTheme as jest.Mock<Theme>;

const mockHook = () => {
  mockTheme.mockReturnValue(themes[0]);
};

describe('Bullet List Component', () => {
  beforeEach(() => mockHook());

  it('renders the component title', () => {
    render(<BulletList title={'test'} headerRight={<></>} list={[<></>]} />);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders all bullets', () => {
    render(<BulletList title={'test'} headerRight={<></>} list={[<>one</>, <>two</>]} />);

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('renders ordered list', () => {
    render(<BulletList title={'test'} headerRight={<></>} list={[<>one</>, <>two</>]} ordered />);

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });
});
