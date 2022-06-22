/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, routerWrapperBuilder, screen } from '../../../test-support/test-utils';
import PageBreadcrumbs from './page-breadcrumbs';

// Render component under test
const renderComponent = (title = 'test', pages = []) => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <PageBreadcrumbs currentPageTitle={title} previousPages={pages} />
    </RouterWrapper>
  );
};

describe('page-breadcrumbs component', () => {
  it('renders without error', () => {
    renderComponent();
  });

  it('renders title', () => {
    renderComponent();

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
