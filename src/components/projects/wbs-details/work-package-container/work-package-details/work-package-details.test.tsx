/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../../../test-support/test-utils';
import { WorkPackage } from 'utils';
import { endDatePipe, fullNamePipe, weeksPipe, percentPipe } from '../../../../../shared/pipes';
import {
  exampleWorkPackage1,
  exampleWorkPackage2,
  exampleWorkPackage3
} from '../../../../../test-support/test-data/work-packages.stub';
import WorkPackageDetails from './work-package-details';

describe('Rendering Work Package Details Component', () => {
  it('renders all the fields, example 1', () => {
    const wp: WorkPackage = exampleWorkPackage1;
    render(<WorkPackageDetails workPackage={wp} />);
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(wp.projectLead)}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(wp.projectManager)}`, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(`${weeksPipe(wp.duration)}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${wp.startDate.toLocaleDateString()}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`, { exact: false })
    ).toBeInTheDocument();
    if (wp.progress === wp.expectedProgress) {
      const progresses = screen.getAllByText(`${percentPipe(wp.progress)}`);
      expect(progresses.length).toBe(2);
    } else {
      expect(screen.getByText(`${wp.progress}%`, { exact: false })).toBeInTheDocument();
      expect(
        screen.getByText(`${percentPipe(wp.expectedProgress)}`, { exact: false })
      ).toBeInTheDocument();
    }
  });

  it('renders all the fields, example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    render(<WorkPackageDetails workPackage={wp} />);
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(wp.projectLead)}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(wp.projectManager)}`, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(`${weeksPipe(wp.duration)}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${wp.startDate.toLocaleDateString()}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`, { exact: false })
    ).toBeInTheDocument();
    if (wp.progress === wp.expectedProgress) {
      const progresses = screen.getAllByText(`${percentPipe(wp.progress)}`);
      expect(progresses.length).toBe(2);
    } else {
      expect(screen.getByText(`${wp.progress}%`, { exact: false })).toBeInTheDocument();
      expect(
        screen.getByText(`${percentPipe(wp.expectedProgress)}`, { exact: false })
      ).toBeInTheDocument();
    }
  });

  it('renders all the fields, example 3', () => {
    const wp: WorkPackage = exampleWorkPackage3;
    render(<WorkPackageDetails workPackage={wp} />);
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(wp.projectLead)}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${fullNamePipe(wp.projectManager)}`, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(`${weeksPipe(wp.duration)}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${wp.startDate.toLocaleDateString()}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`, { exact: false })
    ).toBeInTheDocument();
    if (wp.progress === wp.expectedProgress) {
      const progresses = screen.getAllByText(`${percentPipe(wp.progress)}`);
      expect(progresses.length).toBe(2);
    } else {
      expect(screen.getByText(`${wp.progress}%`, { exact: false })).toBeInTheDocument();
      expect(
        screen.getByText(`${percentPipe(wp.expectedProgress)}`, { exact: false })
      ).toBeInTheDocument();
    }
  });
});
