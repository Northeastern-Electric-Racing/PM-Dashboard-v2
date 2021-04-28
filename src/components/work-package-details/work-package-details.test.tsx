/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import WorkPackageDetails from './work-package-details';
import { exampleWorkPackage1, exampleWorkPackage2, exampleWorkPackage3, WorkPackage } from 'utils';
import { dollarsPipe, endDatePipe, fullNamePipe, weeksPipe } from '../../shared/pipes';

describe('Rendering Work Packagae Details Component', () => {
  test('Rendering example 1', () => {
    const wp: WorkPackage = exampleWorkPackage1;
    render(<WorkPackageDetails workPackage={wp} />);
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fullNamePipe(wp.projectLead)}`)).toBeInTheDocument();
    expect(screen.getByText(`${fullNamePipe(wp.projectManager)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();

    expect(screen.getByText(`${weeksPipe(wp.duration)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.progress}%`)).toBeInTheDocument();
  });

  test('Rendering example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    render(<WorkPackageDetails workPackage={wp} />);
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fullNamePipe(wp.projectLead)}`)).toBeInTheDocument();
    expect(screen.getByText(`${fullNamePipe(wp.projectManager)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();

    expect(screen.getByText(`${weeksPipe(wp.duration)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.progress}%`)).toBeInTheDocument();
  });

  test('Rendering example 3', () => {
    const wp: WorkPackage = exampleWorkPackage3;
    render(<WorkPackageDetails workPackage={wp} />);
    expect(screen.getByText(`Work Package Details`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.status}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fullNamePipe(wp.projectLead)}`)).toBeInTheDocument();
    expect(screen.getByText(`${fullNamePipe(wp.projectManager)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();

    expect(screen.getByText(`${weeksPipe(wp.duration)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.progress}%`)).toBeInTheDocument();
  });
});