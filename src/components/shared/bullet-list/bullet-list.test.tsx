/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { FormContext } from '../../projects/wbs-details/work-package-container/work-package-container';
import BulletList from './bullet-list';

describe('Bullet List Component', () => {
  const setField = (field: string, value: any) => {};
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

  it('renders all bullets, in edit mode', () => {
    render(
      <FormContext.Provider value={{ editMode: true, setField }}>
        <BulletList title={'test'} headerRight={<></>} list={[<>one</>, <>two</>]} />
      </FormContext.Provider>
    );
    expect(screen.getByPlaceholderText('one')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('two')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Input new bullet here')).toBeInTheDocument();
  });

  it('renders all bullets, in edit mode and readOnly mode', () => {
    render(
      <FormContext.Provider value={{ editMode: true, setField }}>
        <BulletList
          title={'test'}
          headerRight={<></>}
          list={[<>one</>, <>two</>]}
          readOnly={true}
        />
      </FormContext.Provider>
    );
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('one')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('two')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Input new bullet here')).not.toBeInTheDocument();
  });
});
