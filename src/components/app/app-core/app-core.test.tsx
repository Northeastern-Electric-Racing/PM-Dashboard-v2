/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext, { UserContext, UserLogInContext } from '../app-context/app-context';
import { act, render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import { routes } from '../../../shared/routes';
import AppCore from './app-core';

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
const renderComponent = (route?: string) => {
  const RouterWrapper = routerWrapperBuilder({ route });
  return render(
    <RouterWrapper>
      <AppContext>
        <AppCore />
        <TestComponent />
      </AppContext>
    </RouterWrapper>
  );
};

describe('app core', () => {
  afterEach(() => {
    pushed = [];
  });

  it('already logged in via memory', () => {
    renderComponent(); // component must render with no mocked setup
    jest.resetAllMocks(); // reset mocks to get clean slate for testing
    pushed = []; // reset pushed for clean slate for testing
    act(() => setupUser('test-user')); // set the user, also triggers re-render

    expect(localStorage.getItem).toBeCalledTimes(2);
    expect(localStorage.getItem).toBeCalledWith('userId');
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith('userId', 'test-user');

    expect(pushed).toEqual([]);

    expect(screen.getByText('app public')).toBeInTheDocument();
    expect(screen.getByText('user: test-user')).toBeInTheDocument();
    expect(screen.getByText('stored user:')).toBeInTheDocument();
  });

  it('user id is in the local storage', () => {
    mockedLocalStorageGetItem.mockReturnValue('test-user');
    renderComponent();

    expect(localStorage.getItem).toBeCalledTimes(4);
    expect(localStorage.getItem).toBeCalledWith('userId');
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith('userId', 'test-user');

    expect(pushed).toEqual([]);

    expect(screen.getByText('app public')).toBeInTheDocument();
    expect(screen.getByText('user: test-user')).toBeInTheDocument();
    expect(screen.getByText('stored user: test-user')).toBeInTheDocument();
  });

  it('no stored user', () => {
    renderComponent(routes.CHANGE_REQUESTS);

    expect(localStorage.getItem).toBeCalledTimes(2);
    expect(localStorage.getItem).toBeCalledWith('userId');
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith('redirectUrl', routes.CHANGE_REQUESTS);

    expect(pushed).toEqual([routes.LOGIN]);

    expect(screen.getByText('app public')).toBeInTheDocument();
    expect(screen.getByText('user:')).toBeInTheDocument();
    expect(screen.getByText('stored user:')).toBeInTheDocument();
  });
});
