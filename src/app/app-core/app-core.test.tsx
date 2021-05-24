/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, useHistory } from 'react-router-dom';
import AppContext, { UserContext, UserLogInContext } from '../app-context/app-context';
import AppCore from './app-core';
import { routes } from '../../shared/routes';

jest.mock('../app-public/app-public', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>app public</div>;
    }
  };
});

const mockedLocalStorageGetItem = localStorage.getItem as jest.Mock;
let setupUser = (_a: string) => {};
let pushed: string[] = [];

const TestComponent = () => {
  setupUser = useContext(UserLogInContext);
  const user = useContext(UserContext);
  const storedUserId = localStorage.getItem('userId');
  const history = useHistory();
  history.listen((loc) => {
    pushed.push(loc.pathname);
  });
  return (
    <>
      <p>user: {user}</p>
      <p>stored user: {storedUserId}</p>
    </>
  );
};

// Sets up the component under test with the desired values and renders it
const renderComponent = () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Route path={'/'}>
        <AppContext>
          <AppCore />
          <TestComponent />
        </AppContext>
      </Route>
    </MemoryRouter>
  );
};

describe('app core', () => {
  afterEach(() => {
    pushed = [];
  });

  it('already logged in via memory', () => {
    renderComponent();
    act(() => setupUser('test-user'));

    expect(localStorage.getItem).toBeCalledTimes(4);
    expect(localStorage.getItem).toBeCalledWith('userId');

    expect(pushed).toEqual([routes.LOGIN]);

    expect(screen.getByText('app public')).toBeInTheDocument();
    expect(screen.getByText('user: test-user')).toBeInTheDocument();
    expect(screen.getByText('stored user:')).toBeInTheDocument();
  });

  it('user id is in the local storage', () => {
    mockedLocalStorageGetItem.mockReturnValue('test-user');
    renderComponent();

    expect(localStorage.getItem).toBeCalledTimes(4);
    expect(localStorage.getItem).toBeCalledWith('userId');

    expect(pushed).toEqual([routes.HOME]);

    expect(screen.getByText('app public')).toBeInTheDocument();
    expect(screen.getByText('user: test-user')).toBeInTheDocument();
    expect(screen.getByText('stored user: test-user')).toBeInTheDocument();
  });

  it('no stored user', () => {
    renderComponent();

    expect(localStorage.getItem).toBeCalledTimes(2);
    expect(localStorage.getItem).toBeCalledWith('userId');

    expect(pushed).toEqual([routes.LOGIN]);

    expect(screen.getByText('app public')).toBeInTheDocument();
    expect(screen.getByText('user:')).toBeInTheDocument();
    expect(screen.getByText('stored user:')).toBeInTheDocument();
  });
});
