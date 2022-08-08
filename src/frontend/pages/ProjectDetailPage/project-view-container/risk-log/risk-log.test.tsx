/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { useTheme } from '../../../../../services/theme.hooks';
import themes from '../../../../../shared/themes';
import { Theme } from '../../../../../shared/types';
import RiskLog from './risk-log';

jest.mock('../../../../../services/theme.hooks');
const mockTheme = useTheme as jest.Mock<Theme>;

const mockHook = () => {
  mockTheme.mockReturnValue(themes[0]);
};

describe('Rendering Project Risk Log Component', () => {
  beforeEach(() => mockHook());

  const testRisks = [
    { details: 'Risk #1', resolved: false },
    { details: 'Risk #2', resolved: true },
    { details: 'Risk #3', resolved: false }
  ];

  it('Renders the RiskLog title', () => {
    render(<RiskLog risks={testRisks} />);

    expect(screen.getByText('Risk Log')).toBeInTheDocument();
  });

  it('Renders all of the risks', () => {
    render(<RiskLog risks={testRisks} />);

    expect(screen.getByText('Risk #1')).toBeInTheDocument();
    expect(screen.getByText('Risk #2')).toBeInTheDocument();
    expect(screen.getByText('Risk #3')).toBeInTheDocument();
  });
});
