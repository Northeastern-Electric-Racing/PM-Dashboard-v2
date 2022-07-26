/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { useTheme } from '../../../services/theme.hooks';
import themes from '../../../shared/themes';
import { Theme } from '../../../shared/types';
import CheckList from './check-list';

jest.mock('../../../services/theme.hooks');
const mockTheme = useTheme as jest.Mock<Theme>;

const mockHook = () => {
  mockTheme.mockReturnValue(themes[0]);
};

describe('Check List Component', () => {
  const testList = [
    { details: 'Check #1', resolved: false },
    { details: 'Check #2', resolved: true },
    { details: 'Check #3', resolved: false }
  ];

  beforeEach(() => mockHook());

  it('renders the component title', () => {
    render(<CheckList title={'test'} list={[]} />);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders all details', () => {
    render(<CheckList title={'test'} list={testList} />);

    expect(screen.getByText('Check #1')).toBeInTheDocument();
    expect(screen.getByText('Check #2')).toBeInTheDocument();
    expect(screen.getByText('Check #3')).toBeInTheDocument();
  });

  it('checks checkboxes that should be checked', () => {
    render(<CheckList title={'test'} list={testList} />);

    expect(screen.getByTestId('testCheckbox0')).not.toBeChecked();
    expect(screen.getByTestId('testCheckbox1')).toBeChecked();
    expect(screen.getByTestId('testCheckbox2')).not.toBeChecked();
  });

  it('renders all buttons"', () => {
    render(<CheckList title={'test'} list={testList} />);

    expect(screen.getByText('Convert to CR')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Add New Risk')).toBeInTheDocument();
  });

  it('renders the header right', () => {
    render(<CheckList title="test" headerRight="testheaderright" list={[]} />);

    expect(screen.getByText('testheaderright')).toBeInTheDocument();
  });
});
