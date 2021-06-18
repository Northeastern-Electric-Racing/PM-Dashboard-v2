/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen, routerWrapperBuilder } from '../../../../../test-support/test-utils';
import { wbsPipe } from '../../../../../shared/pipes';
import { exampleWorkPackage2 } from '../../../../../test-support/test-data/work-packages.stub';
import WorkPackageDependencies from './work-package-dependencies';

// Sets up the component under test with the desired values and renders it
const renderComponent = (path?: string, route?: string) => {
  const RouterWrapper = routerWrapperBuilder({ path, route });
  return render(
    <RouterWrapper>
      <WorkPackageDependencies workPackage={exampleWorkPackage2} />
    </RouterWrapper>
  );
};

describe('Rendering Work Packagae Dependencies Component', () => {
  test('Rendering example 2', () => {
    renderComponent();
    expect(screen.getByText(`Dependencies`)).toBeInTheDocument();

    exampleWorkPackage2.dependencies.forEach(function (wbs) {
      expect(screen.getByText(`${wbsPipe(wbs)}`)).toBeInTheDocument();
    });
  });
});
