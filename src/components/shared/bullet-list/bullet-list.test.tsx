/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import AppContext from '../../app/app-context/app-context';
import BulletList from './bullet-list';

describe('Bullet List Component', () => {
  it('renders the component title', () => {
    render(
      <AppContext>
        <BulletList title={'test'} headerRight={<></>} list={[<></>]} />
      </AppContext>
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders all bullets', () => {
    render(
      <AppContext>
        <BulletList title={'test'} headerRight={<></>} list={[<>one</>, <>two</>]} />
      </AppContext>
    );

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('renders ordered list', () => {
    render(
      <AppContext>
        <BulletList title={'test'} headerRight={<></>} list={[<>one</>, <>two</>]} ordered />
      </AppContext>
    );

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });
});
