/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { act, render, screen } from '@testing-library/react'; // avoid circular dependency
import { useAllChangeRequests } from '../../../services/change-requests.hooks';
import AppContext, { UserContext, UserLogInContext, UserLogOutContext } from './app-context';

describe('app context', () => {
  it('renders simple text as children', () => {
    render(<AppContext>hello</AppContext>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('provides the user and login function to child components', () => {
    let setupUser = (_a: string) => {};
    const TestComponent = () => {
      const user = useContext(UserContext);
      setupUser = useContext(UserLogInContext);
      return <p>{user}</p>;
    };
    render(
      <AppContext>
        <TestComponent />
      </AppContext>
    );
    act(() => setupUser('test-user'));
    expect(screen.getByText('test-user')).toBeInTheDocument();
  });

  it('provides the logout function to child components', () => {
    let setupUser = (_a: string) => {};
    const TestComponent = () => {
      const user = useContext(UserContext);
      setupUser = useContext(UserLogInContext);
      const logOutUser = useContext(UserLogOutContext);
      return (
        <>
          <p>{user}</p>
          <button onClick={logOutUser}>log out</button>
        </>
      );
    };
    render(
      <AppContext>
        <TestComponent />
      </AppContext>
    );
    act(() => setupUser('test-user'));
    expect(screen.getByText('test-user')).toBeInTheDocument();
    screen.getByText('log out').click();
    expect(screen.queryByText('test-user')).not.toBeInTheDocument();
  });

  it('properly interacts with local storage for log in and log out', () => {
    let setupUser = (_a: string) => {};
    const TestComponent = () => {
      const user = useContext(UserContext);
      setupUser = useContext(UserLogInContext);
      const logOutUser = useContext(UserLogOutContext);
      return (
        <>
          <p>{user}</p>
          <button onClick={logOutUser}>log out</button>
        </>
      );
    };
    render(
      <AppContext>
        <TestComponent />
      </AppContext>
    );

    act(() => setupUser('test-user'));
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith('userId', 'test-user');
    expect(screen.getByText('test-user')).toBeInTheDocument();

    screen.getByText('log out').click();
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith('userId');
    expect(screen.queryByText('test-user')).not.toBeInTheDocument();

    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledTimes(1);
  });

  it('properly provider query client', () => {
    const TestComponent = () => {
      const result = useAllChangeRequests();
      return <p>{result.status}</p>;
    };
    render(
      <AppContext>
        <TestComponent />
      </AppContext>
    );

    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});
