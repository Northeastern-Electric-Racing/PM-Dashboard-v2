/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { wbsPipe, weeksPipe } from '../../../../../shared/pipes';
import { exampleProject1 } from '../../../../../test-support/test-data/projects.stub';
import { render, screen } from '../../../../../test-support/test-utils';
import ProjectEditWorkPackagesList from './project-edit-wp-list';

const { workPackages } = exampleProject1;

describe('test suite for ProjectEditWorkPackagesList', () => {
  it('render cards and card headers', () => {
    render(<ProjectEditWorkPackagesList workPackages={workPackages} />);

    expect(screen.getByText('Work Packages')).toBeInTheDocument();

    workPackages.forEach((wp) => {
      expect(screen.getByText(wbsPipe(wp.wbsNum))).toBeInTheDocument();
      expect(screen.getByText(wp.name)).toBeInTheDocument();
      expect(screen.getByText(weeksPipe(wp.duration))).toBeInTheDocument();
    });
  });
});
