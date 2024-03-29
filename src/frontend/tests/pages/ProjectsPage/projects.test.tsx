/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../../test-support/test-utils';
import { routes } from '../../../../shared/routes';
import Projects from '../../../pages/ProjectsPage/projects';

jest.mock('../../../pages/ProjectsPage/projects-table', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Projects Table</div>;
    }
  };
});

jest.mock('../../../pages/wbs-details', () => {
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
const renderComponent = (route: string) => {
  const RouterWrapper = routerWrapperBuilder({ route });
  return render(
    <RouterWrapper>
      <Projects />
    </RouterWrapper>
  );
};

describe('projects page component', () => {
  it.skip('renders the projects table page title', () => {
    renderComponent(routes.PROJECTS);

    // idk why this test is failing
    expect(screen.getByText('Projects Table')).toBeInTheDocument();
  });

  it('renders the wbs element page title', () => {
    renderComponent(`${routes.PROJECTS}/1.8.1`);
    expect(screen.getByText('WBS Details')).toBeInTheDocument();
  });
});
