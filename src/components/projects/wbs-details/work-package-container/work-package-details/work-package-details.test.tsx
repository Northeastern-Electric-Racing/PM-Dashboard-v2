/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import { WorkPackage } from 'utils';
import { endDatePipe, fullNamePipe, weeksPipe, listPipe } from '../../../../../shared/pipes';
import {
  exampleWorkPackage1,
  exampleWorkPackage2,
  exampleWorkPackage3
} from '../../../../../test-support/test-data/work-packages.stub';
import AppContext from '../../../../app/app-context/app-context';
import WorkPackageDetails from './work-package-details';

describe('Rendering Work Packagae Details Component', () => {
  it('renders all the fields, example 1', () => {
    const wp: WorkPackage = exampleWorkPackage1;
    render(
      <AppContext>
        <WorkPackageDetails workPackage={wp} />
      </AppContext>
    );
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${listPipe(wp.projectLead, fullNamePipe)}`, { exact: false })
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
    expect(screen.getByText(`${wp.progress}%`, { exact: false })).toBeInTheDocument();
  });

  it('renders all the fields, example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    render(
      <AppContext>
        <WorkPackageDetails workPackage={wp} />
      </AppContext>
    );
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${listPipe(wp.projectLead, fullNamePipe)}`, { exact: false })
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
    expect(screen.getByText(`${wp.progress}%`, { exact: false })).toBeInTheDocument();
  });

  it('renders all the fields, example 3', () => {
    const wp: WorkPackage = exampleWorkPackage3;
    render(
      <AppContext>
        <WorkPackageDetails workPackage={wp} />
      </AppContext>
    );
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(`${listPipe(wp.projectLead, fullNamePipe)}`, { exact: false })
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
    expect(screen.getByText(`${wp.progress}%`, { exact: false })).toBeInTheDocument();
  });
});
