/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-support/test-utils';
import AppMain from './app-main';

jest.mock('../app-core/app-core', () => {
  return {
    __esModule: true,
    default: () => <div>core</div>
  };
});

jest.mock('../app-context/app-context', () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div>
        context
        <div>{props.children}</div>
      </div>
    )
  };
});

// Sets up the component under test with the desired values and renders it
const renderComponent = (path?: string, route?: string) => {
  renderWithRouter(<AppMain />, { path, route });
};

describe('app main, entry component', () => {
  it('renders the app context component', () => {
    renderComponent();
    expect(screen.getByText('context')).toBeInTheDocument();
  });

  it('renders the app core component', () => {
    renderComponent();
    expect(screen.getByText('core')).toBeInTheDocument();
  });
});
