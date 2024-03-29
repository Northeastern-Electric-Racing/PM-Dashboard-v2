/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../test-support/test-utils';
import AppMain from '../../app/app-main';

jest.mock('../../app/app-public', () => {
  return {
    __esModule: true,
    default: () => <div>public</div>
  };
});

jest.mock('../../app/app-context', () => {
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
const renderComponent = () => {
  render(<AppMain />);
};

describe('app main, entry component', () => {
  it('renders the app context component', () => {
    renderComponent();
    expect(screen.getAllByText('context')[0]).toBeInTheDocument();
  });

  it('renders the app public component', () => {
    renderComponent();
    expect(screen.getByText('public')).toBeInTheDocument();
  });
});
