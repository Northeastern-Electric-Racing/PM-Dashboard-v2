/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { UseMutationResult, UseQueryResult } from 'react-query';
import { User } from 'utils';
import { render, screen } from '../../../../test-support/test-utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useAllUsers, useLogUserIn } from '../../../../services/users.hooks';
import { exampleWbs1 } from '../../../../test-support/test-data/wbs-numbers.stub';
import StageGateWorkPackageModalContainer from './stage-gate-work-package-modal-container';
import {
  mockUseMutationResult,
  mockUseQueryResult
} from '../../../../test-support/test-data/test-utils.stub';
import { useCreateStageGateChangeRequest } from '../../../../services/change-requests.hooks';
import { exampleAllUsers } from '../../../../test-support/test-data/users.stub';

jest.mock('../../../../services/users.hooks');

const mockedUseAllUsers = useAllUsers as jest.Mock<UseQueryResult<User[]>>;

const mockUseAllUsersHook = (isLoading = false, isError = false, data?: User[], error?: Error) => {
  mockedUseAllUsers.mockReturnValue(mockUseQueryResult(isLoading, isError, data, error));
};

const mockedUseLogUserIn = useLogUserIn as jest.Mock<UseMutationResult>;

const mockUseLogUserInHook = (isLoading: boolean, isError: boolean, error?: Error) => {
  mockedUseLogUserIn.mockReturnValue(
    mockUseMutationResult<{ in: string }>(isLoading, isError, { in: 'hi' }, error)
  );
};

jest.mock('../../../../services/change-requests.hooks');

// random shit to make test happy by mocking out this hook
const mockedUseCreateStageGateCR = useCreateStageGateChangeRequest as jest.Mock<UseMutationResult>;

const mockUseCreateStageGateCRHook = (isLoading: boolean, isError: boolean, error?: Error) => {
  mockedUseCreateStageGateCR.mockReturnValue(
    mockUseMutationResult<{ in: string }>(isLoading, isError, { in: 'hi' }, error)
  );
};

const renderComponent = () => {
  return render(
    <StageGateWorkPackageModalContainer
      modalShow={true}
      handleClose={() => null}
      wbsNum={exampleWbs1}
    />
  );
};

describe('activate work package modal container test suite', () => {
  beforeEach(() => {
    mockUseLogUserInHook(false, false);
  });

  it('renders component without crashing', () => {
    mockUseAllUsersHook(false, false, exampleAllUsers);
    mockUseCreateStageGateCRHook(false, false);
    renderComponent();

    expect(screen.getByText(`Stage Gate #${wbsPipe(exampleWbs1)}`)).toBeInTheDocument();
  });

  it('renders loading indicator when loading', () => {
    mockUseAllUsersHook(true, false);
    mockUseCreateStageGateCRHook(true, false);
    renderComponent();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error page when error', () => {
    mockUseAllUsersHook(false, true, exampleAllUsers);
    mockUseCreateStageGateCRHook(false, true, new Error('some error'));
    renderComponent();

    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
