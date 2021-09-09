/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../test-support/test-utils';
import UsefulLinks from './useful-links';

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <UsefulLinks />
    </RouterWrapper>
  );
};

describe('useful links component', () => {
  it('renders headers', () => {
    renderComponent();
    expect(screen.getByText(/Useful Links/i)).toBeInTheDocument();
    expect(screen.getByText(/Finance/i)).toBeInTheDocument();
    expect(screen.getByText(/Other/i)).toBeInTheDocument();
  });

  it('renders links', () => {
    renderComponent();
    expect(screen.getByText(/Personal purchasing guidelines/i)).toBeInTheDocument();
    expect(screen.getByText(/Procurement form/i)).toBeInTheDocument();
    expect(screen.getByText(/Part numbering spreadsheet/i)).toBeInTheDocument();
  });
});
