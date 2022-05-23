/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import HorizontalList from './horizontal-list';

describe('Horizontal List Component', () => {
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
