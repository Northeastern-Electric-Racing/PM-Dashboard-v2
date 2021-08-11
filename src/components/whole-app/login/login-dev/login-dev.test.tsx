/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useHistory } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  routerWrapperBuilder
} from '../../../../test-support/test-utils';
import { routes } from '../../../../shared/routes';
import LoginDev from './login-dev';

const mockedLocalStorageGetItem = localStorage.getItem as jest.Mock;
let pushed: string[] = [];

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  const TestComponent = () => {
    const history = useHistory();
    history.listen((loc) => {
      pushed.push(loc.pathname);
    });
    return <LoginDev />;
  };
  const RouterWrapper = routerWrapperBuilder({ path: routes.LOGIN, route: routes.LOGIN });
  return render(
    <RouterWrapper>
      <TestComponent />
    </RouterWrapper>
  );
};

describe('login component', () => {
  afterEach(() => {
    pushed = [];
  });

  it('renders title', () => {
    renderComponent();
    expect(screen.getByText(/NER PM Dashboard/i)).toBeInTheDocument();
  });

  it('renders help text', () => {
    renderComponent();
    expect(screen.getByText(/Login Required/i)).toBeInTheDocument();
  });

  it('renders login button', () => {
    renderComponent();
    const btn = screen.getByText('Log In');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('class', 'btn btn-primary');
  });

  it('has clickable login button', async () => {
    renderComponent();
    const btn = screen.getByText('Log In');
    fireEvent.click(btn);
    expect(btn).not.toBeInTheDocument();
  });

  it('has typeable name input', async () => {
    renderComponent();
    const input = screen.getByLabelText('name') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'kevin' } });
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
    expect(input.value).toEqual('kevin');
  });

  it('redirect to home if no stored url', () => {
    mockedLocalStorageGetItem.mockReturnValue(undefined);
    renderComponent();
    const input = screen.getByLabelText('name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'kevin' } });
    fireEvent.click(screen.getByText('Log In'));

    expect(pushed).toEqual([routes.HOME]);
    expect(localStorage.getItem).toBeCalledTimes(2);
    expect(localStorage.getItem).toBeCalledWith('redirectUrl');
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith('redirectUrl');
  });

  it('redirect to stored url', () => {
    mockedLocalStorageGetItem.mockReturnValue(routes.CHANGE_REQUESTS);
    renderComponent();
    const input = screen.getByLabelText('name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'kevin' } });
    fireEvent.click(screen.getByText('Log In'));

    expect(pushed).toEqual([routes.CHANGE_REQUESTS]);
    expect(localStorage.getItem).toBeCalledTimes(2);
    expect(localStorage.getItem).toBeCalledWith('redirectUrl');
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith('redirectUrl');
  });
});
