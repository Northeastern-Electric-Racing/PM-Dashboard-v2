/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { exampleProject1, Project } from 'utils';
import { ApiHookReturn } from '../../services/api-request';
import { useSingleProject } from '../../services/projects';
import ProjectContainer from './project-container';

jest.mock('../../services/projects');

const mockedUseSingleChangeRequest = useSingleProject as jest.Mock<ApiHookReturn<Project>>;

const mockHook = (isLoading: boolean, errorMessage: string, responseData?: Project) => {
  mockedUseSingleChangeRequest.mockReturnValue({ isLoading, errorMessage, responseData });
};

// Sets up the component under test with the desired values and renders it.
const renderComponent: () => void = () => {
  render(<ProjectContainer wbsNum={{ car: 1, project: 1, workPackage: 0 }} />);
};

describe('Rendering Project Container', () => {
  it('renders the loading indicator', () => {
    mockHook(true, '');
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the loaded project', () => {
    mockHook(false, '', exampleProject1);
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('1.1.0 - Impact Attenuator')).toBeInTheDocument();
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Work Packages')).toBeInTheDocument();
    expect(screen.getByText('Bodywork Concept of Design')).toBeInTheDocument();
  });

  it('handles the error with message', () => {
    mockHook(false, '404 could not find the requested project');
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('404 could not find the requested project')).toBeInTheDocument();
  });

  it('handles the error with no message', () => {
    mockHook(false, '');
    renderComponent();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('project')).not.toBeInTheDocument();
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
  });
});
