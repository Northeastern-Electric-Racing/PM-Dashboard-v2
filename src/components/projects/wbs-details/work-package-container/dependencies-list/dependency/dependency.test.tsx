import { render, screen } from '../../../../../../test-support/test-utils';
import Dependency from './dependency';
import { FormContext } from '../../work-package-container';
import { exampleWbsWorkPackage1 } from '../../../../../../test-support/test-data/wbs-numbers.stub';
import { wbsPipe } from '../../../../../../shared/pipes';

describe('rendering a dependency', () => {
  const setField = (field: string, value: any) => {};
  test('renders with edit mode disabled', () => {
    render(
      <FormContext.Provider value={{ editMode: false, setField }}>
        <Dependency wbsNumber={exampleWbsWorkPackage1} />
      </FormContext.Provider>
    );
    expect(screen.getByText(wbsPipe(exampleWbsWorkPackage1))).toBeInTheDocument();
  });
  test('renders with edit mode enabled', () => {
    render(
      <FormContext.Provider value={{ editMode: true, setField }}>
        <Dependency wbsNumber={exampleWbsWorkPackage1} />
      </FormContext.Provider>
    );
    expect(screen.getByText(wbsPipe(exampleWbsWorkPackage1))).toBeInTheDocument();
  });
});
