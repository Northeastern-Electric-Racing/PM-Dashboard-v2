/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { render, screen } from '@testing-library/react';
import { UseQueryResult } from 'react-query';
import { WorkPackage } from 'utils';
import { mockUseQueryResult } from '../../test-support/test-data/test-utils.stub';
import { useSingleWorkPackage } from '../../services/api-hooks/work-packages.hooks';
import { exampleWbsProject1 } from '../../test-support/test-data/wbs-numbers.stub';
import { exampleWorkPackage1 } from '../../test-support/test-data/work-packages.stub';
import WorkPackageContainer from './work-package-container';

jest.mock('../../services/api-hooks/work-packages.hooks');

const mockedUseSingleWorkPackage = useSingleWorkPackage as jest.Mock<UseQueryResult<WorkPackage>>;

const mockHook = (isLoading: boolean, isError: boolean, data?: WorkPackage, error?: Error) => {
  mockedUseSingleWorkPackage.mockReturnValue(
    mockUseQueryResult<WorkPackage>(isLoading, isError, data, error)
  );
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  render(<WorkPackageContainer wbsNum={exampleWbsProject1} />);
};

describe('work package container', () => {
  it('renders the loading indicator', () => {
    mockHook(true, false);
    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the loaded project', () => {
    mockHook(false, false, exampleWorkPackage1);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('1.12.0 - Bodywork Concept of Design')).toBeInTheDocument();
    expect(screen.getByText('Work Package Details')).toBeInTheDocument();
    expect(screen.getByText('Deliverables:')).toBeInTheDocument();
    expect(screen.getByText('Duration:')).toBeInTheDocument();
    expect(screen.getByText('Progress:')).toBeInTheDocument();
  });

  it('handles the error with message', () => {
    mockHook(false, true, undefined, new Error('404 could not find the requested work package'));
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested work package')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockHook(false, true);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('work package')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
