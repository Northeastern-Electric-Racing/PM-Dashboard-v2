/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { render, screen } from '@testing-library/react';
import { WorkPackage } from 'utils';
import { ApiHookReturn } from '../../../../services/api-request';
import { useSingleWorkPackage } from '../../../../services/work-packages';
import { exampleWbsProject1 } from '../../../../test-support/test-data/wbs-numbers.stub';
import { exampleWorkPackage1 } from '../../../../test-support/test-data/work-packages.stub';
import WorkPackageContainer from './work-package-container';

jest.mock('../../../../services/work-packages');

const mockedUseSingleWorkPackage = useSingleWorkPackage as jest.Mock<ApiHookReturn<WorkPackage>>;

const mockHook = (isLoading: boolean, errorMessage: string, responseData?: WorkPackage) => {
  mockedUseSingleWorkPackage.mockReturnValue({ isLoading, errorMessage, responseData });
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  render(<WorkPackageContainer wbsNum={exampleWbsProject1} />);
};

describe('work package container', () => {
  it('renders the loading indicator', () => {
    mockHook(true, '');
    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the loaded project', () => {
    mockHook(false, '', exampleWorkPackage1);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('1.12.0 - Bodywork Concept of Design')).toBeInTheDocument();
    expect(screen.getByText('Work Package Details')).toBeInTheDocument();
    expect(screen.getByText('Deliverables:')).toBeInTheDocument();
    expect(screen.getByText('Duration:')).toBeInTheDocument();
    expect(screen.getByText('Progress:')).toBeInTheDocument();
  });

  it('handles the error with message', () => {
    mockHook(false, '404 could not find the requested work package');
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested work package')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockHook(false, '');
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('work package')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
