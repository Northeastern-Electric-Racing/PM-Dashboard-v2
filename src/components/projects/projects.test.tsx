/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { routes } from '../../shared/routes';
import { renderWithRouter } from '../../test-support/test-utils';
import Projects from './projects';

jest.mock('./projects-table/projects-table', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Projects Table</div>;
    }
  };
});

jest.mock('./wbs-details/wbs-details', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>WBS Details</div>;
    }
  };
});

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (routeOverride?: string) => {
  const renderRoute: string = routeOverride || routes.PROJECTS;
  renderWithRouter(<Projects />, { route: renderRoute });
};

describe('projects page component', () => {
  it('renders the projects table page title', () => {
    renderComponent();
    expect(screen.getByText('Projects Table')).toBeInTheDocument();
  });

  it('renders the wbs element page title', () => {
    const wbsNumToRender: string = '1.8.1';
    renderComponent(`${routes.PROJECTS}/${wbsNumToRender}`);
    expect(screen.getByText('WBS Details')).toBeInTheDocument();
  });
});
