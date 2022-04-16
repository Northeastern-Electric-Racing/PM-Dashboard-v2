import { render, screen } from '../../../../../../../test-support/test-utils';
import Dependency from './dependency';
import { FormContext } from '../../../work-package-container';
import { exampleWbsWorkPackage1 } from '../../../../../../../test-support/test-data/wbs-numbers.stub';
import { wbsPipe } from '../../../../../../../shared/pipes';

describe('rendering a dependency', () => {
  const setField = (field: string, value: any) => {};
  it('renders with edit mode disabled', () => {
    render(<Dependency wbsNumber={exampleWbsWorkPackage1} handleDelete={() => {}} />);
    expect(screen.getByText(wbsPipe(exampleWbsWorkPackage1))).toBeInTheDocument();
  });
});
