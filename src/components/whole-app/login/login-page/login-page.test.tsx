/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { UseMutationResult } from 'react-query';
import { useHistory } from 'react-router-dom';
import { User } from 'utils';
import {
  render,
  screen,
  fireEvent,
  routerWrapperBuilder
} from '../../../../test-support/test-utils';
import { mockUseMutationResult } from '../../../../test-support/test-data/test-utils.stub';
import { useLogUserIn } from '../../../../services/users.hooks';
import { routes } from '../../../../shared/routes';
import LoginPage from './login-page';

jest.mock('../../../services/users.hooks');

jest.mock('../../shared/loading-indicator/loading-indicator', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>loading-indicator</div>;
    }
  };
});

const mockedUseLogUserIn = useLogUserIn as jest.Mock<UseMutationResult<User, Error, string>>;

const mockHook = (
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  data?: User,
  error?: Error
) => {
  const mutate = (_emailId: string) => jest.fn();
  mockedUseLogUserIn.mockReturnValue(
    mockUseMutationResult<string, User>({ isLoading, isError, isSuccess }, mutate, data, error)
  );
  return mutate;
};

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
    return <Login />;
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
    mockHook(false, false, false);
    renderComponent();
    expect(screen.getByText(/NER PM Dashboard/i)).toBeInTheDocument();
  });

  it('renders help text', () => {
    mockHook(false, false, false);
    renderComponent();
    expect(screen.getByText(/Login Required/i)).toBeInTheDocument();
  });

  it('renders login button', () => {
    mockHook(false, false, false);
    renderComponent();
    const btn = screen.getByText('Log In');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('class', 'btn btn-primary');
  });

  it('has clickable login button', async () => {
    mockHook(false, false, false);
    renderComponent();
    const btn = screen.getByText('Log In');
    fireEvent.click(btn);
  });

  it('has typeable name input', async () => {
    mockHook(false, false, false);
    renderComponent();
    const input = screen.getByLabelText('emailId') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'kevin' } });
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
    expect(input.value).toEqual('kevin');
  });

  it('redirect to home if no stored url', () => {
    mockHook(false, false, true);
    mockedLocalStorageGetItem.mockReturnValue(undefined);
    renderComponent();

    expect(pushed).toEqual([routes.HOME]);
    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(localStorage.getItem).toBeCalledWith('redirectUrl');
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith('redirectUrl');
  });

  it('redirect to stored url', () => {
    mockHook(false, false, true);
    mockedLocalStorageGetItem.mockReturnValue(routes.CHANGE_REQUESTS);
    renderComponent();

    expect(pushed).toEqual([routes.CHANGE_REQUESTS]);
    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(localStorage.getItem).toBeCalledWith('redirectUrl');
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith('redirectUrl');
  });

  it('renders the loading indicator', () => {
    mockHook(true, false, false);
    renderComponent();

    expect(pushed).toEqual([]);
    expect(screen.getByText('loading-indicator')).toBeInTheDocument();
  });

  it('renders the error page', () => {
    mockHook(false, true, false);
    renderComponent();

    expect(pushed).toEqual([]);
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
