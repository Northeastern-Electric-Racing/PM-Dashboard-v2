/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import WorkPackageSummary from './work-package-summary';
import { exampleWorkPackage1, exampleWorkPackage2, exampleWorkPackage3, WorkPackage } from 'utils';
import { dollarsPipe, wbsPipe, listPipe, endDatePipe } from '../../shared/pipes';

describe('Rendering Work Packagae Summary Test', () => {
  test('Rendering example 1', () => {
    const wp: WorkPackage = exampleWorkPackage1;
    render(<WorkPackageSummary workPackage={wp} />);
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${wbsPipe(wp.wbsNum)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.duration} weeks`)).toBeInTheDocument();

    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Dependencies:${listPipe(wp.dependencies, wbsPipe)}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.rules, (str: string) => str)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
  });

  test('Rendering example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    render(<WorkPackageSummary workPackage={wp} />);
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${wbsPipe(wp.wbsNum)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.duration} weeks`)).toBeInTheDocument();

    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.dependencies, wbsPipe)}`)).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.rules, (str: string) => str)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
  });

  test('Rendering example 3', () => {
    const wp: WorkPackage = exampleWorkPackage3;
    render(<WorkPackageSummary workPackage={wp} />);
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${wbsPipe(wp.wbsNum)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.duration} weeks`)).toBeInTheDocument();

    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.dependencies, wbsPipe)}`)).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.rules, (str: string) => str)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
  });
});
