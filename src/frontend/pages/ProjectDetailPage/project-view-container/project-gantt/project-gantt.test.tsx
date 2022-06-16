/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../../../test-support/test-utils';
import { useTheme } from '../../../../../services/theme.hooks';
import themes from '../../../../../shared/themes';
import { Theme } from '../../../../../shared/types';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import ProjectGantt from './project-gantt';

jest.mock('../../../../../services/theme.hooks');
const mockTheme = useTheme as jest.Mock<Theme>;

const mockHook = () => {
  mockTheme.mockReturnValue(themes[0]);
};

// Sets up the component under test with the desired values and renders it.
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <ProjectGantt workPackages={exampleAllWorkPackages} />
    </RouterWrapper>
  );
};

describe('project gantt component', () => {
  beforeEach(() => mockHook());

  it('Renders title', () => {
    renderComponent();
    expect(screen.getByText('Gantt Chart')).toBeInTheDocument();
  });

  it.todo('test display work packages');
});
