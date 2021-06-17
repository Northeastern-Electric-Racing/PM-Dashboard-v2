/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { UseQueryResult } from 'react-query';
import { exampleProject1, Project } from 'utils';
import { renderWithRouter } from '../../../../test-support/test-utils';
import { mockUseQueryResult } from '../../../../test-support/test-data/test-utils.stub';
import { useSingleProject } from '../../../../services/projects.hooks';
import ProjectContainer from './project-container';

jest.mock('../../../../services/projects.hooks');

const mockedUseSingleProject = useSingleProject as jest.Mock<UseQueryResult<Project>>;

const mockHook = (isLoading: boolean, isError: boolean, data?: Project, error?: Error) => {
  mockedUseSingleProject.mockReturnValue(
    mockUseQueryResult<Project>(isLoading, isError, data, error)
  );
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  renderWithRouter(<ProjectContainer wbsNum={{ car: 1, project: 1, workPackage: 0 }} />, {});
};

describe('Rendering Project Container', () => {
  it('renders the loading indicator', () => {
    mockHook(true, false);
    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the loaded project', () => {
    mockHook(false, false, exampleProject1);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('1.1.0 - Impact Attenuator')).toBeInTheDocument();
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Work Packages')).toBeInTheDocument();
    expect(screen.getByText('Bodywork Concept of Design')).toBeInTheDocument();
  });

  it('handles the error with message', () => {
    mockHook(false, true, undefined, new Error('404 could not find the requested project'));
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested project')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockHook(false, true);
    renderComponent();

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('project')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
