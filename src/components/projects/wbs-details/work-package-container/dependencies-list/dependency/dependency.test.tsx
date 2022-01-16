import { render, screen } from '../../../../../../test-support/test-utils'
import Dependency from './dependency';
import { EditModeContext } from '../../work-package-container';
import { exampleWbsWorkPackage1 } from '../../../../../../test-support/test-data/wbs-numbers.stub';
import { wbsPipe } from '../../../../../../shared/pipes';

describe('rendering a dependency', () => {
  test('renders with edit mode disabled', () => {
    render(
      <EditModeContext.Provider value={false}>
        <Dependency wbsNumber={exampleWbsWorkPackage1} />
      </EditModeContext.Provider>
    );
    expect(screen.getByText(wbsPipe(exampleWbsWorkPackage1))).toBeInTheDocument();
  });
  test('renders with edit mode enabled', () => {
    render(
      <EditModeContext.Provider value={true}>
        <Dependency wbsNumber={exampleWbsWorkPackage1} />
      </EditModeContext.Provider>
    );
    expect(screen.getByText(wbsPipe(exampleWbsWorkPackage1))).toBeInTheDocument();
  });
});
