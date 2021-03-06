/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import { routes } from '../../../shared/routes';
import WBSDetails from './wbs-details';

jest.mock('./project-container/project-container', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>project container</div>;
    }
  };
});

jest.mock('./work-package-container/work-package-container', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>work package container</div>;
    }
  };
});

/**
 * Sets up the component under test with the desired values and renders it.
 *
 * @param options WBS number to render the component at
 */
const renderComponent = (wbsNumber: string) => {
  const RouterWrapper = routerWrapperBuilder({
    path: routes.PROJECTS_BY_WBS,
    route: `${routes.PROJECTS}/${wbsNumber}`
  });
  return render(
    <RouterWrapper>
      <WBSDetails />
    </RouterWrapper>
  );
};

describe('wbs element details component', () => {
  it('renders the project page title', () => {
    renderComponent('1.1.0');
    expect(screen.getByText('project container')).toBeInTheDocument();
  });

  it('renders the work package page title', () => {
    renderComponent('1.1.1');
    expect(screen.getByText('work package container')).toBeInTheDocument();
  });

  it('throws when wbsNum is invalid', () => {
    renderComponent('1...1');
    expect(screen.getByText('Oops, sorry!')).toBeInTheDocument();
    expect(screen.getByText('There was an error loading the page.')).toBeInTheDocument();
    expect(screen.getByText('WBS Invalid: incorrect number of periods')).toBeInTheDocument();
  });
});
