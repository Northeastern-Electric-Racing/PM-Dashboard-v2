/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import ProjectsTable from './projects-table';
import {
  exampleProject1,
  exampleProject2,
  exampleProject3,
  exampleProject4,
  exampleProject5,
  exampleAllProjects,
  Project
} from 'utils';
import { wbsPipe, fullNamePipe, weeksPipe } from '../../shared/pipes';
import { wbsRegex } from '../../shared/test-utils';

// Sets up the component under test with the desired values and renders it.
const renderComponent = (prjs: Project[]) => {
  const displayProjects = prjs.map((prj) => {
    return {
      wbsNum: wbsPipe(prj.wbsNum),
      name: prj.name,
      projectLead: fullNamePipe(prj.projectLead),
      projectManager: fullNamePipe(prj.projectManager),
      duration: weeksPipe(prj.workPackages.reduce((tot, cur) => tot + cur.duration, 0))
    };
  });

  render(<ProjectsTable allProjects={displayProjects} />);
};

describe('projects table component', () => {
  it('handles sorting and reverse sorting the table by project name', async () => {
    renderComponent(exampleAllProjects);

    const column: string = 'Name';
    const expectedWbsOrder: string[] = [
      exampleProject3,
      exampleProject2,
      exampleProject1,
      exampleProject4,
      exampleProject5
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele) => ele.innerHTML)).toEqual(expectedWbsOrder.reverse());

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele) => ele.innerHTML)).toEqual(expectedWbsOrder.reverse());
  });

  it('handles sorting and reverse sorting the table by project lead', async () => {
    renderComponent(exampleAllProjects);

    const column: string = 'Project Lead';
    const expectedWbsOrder: string[] = [
      exampleProject1,
      exampleProject2,
      exampleProject5,
      exampleProject3,
      exampleProject4
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele) => ele.innerHTML)).not.toEqual(expectedWbsOrder);

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele) => ele.innerHTML)).toEqual(expectedWbsOrder);
  });

  it('handles sorting and reverse sorting the table by project manager', async () => {
    renderComponent(exampleAllProjects);

    const column: string = 'Project Manager';
    const expectedWbsOrder: string[] = [
      exampleProject1,
      exampleProject4,
      exampleProject2,
      exampleProject3,
      exampleProject5
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele) => ele.innerHTML)).not.toEqual(expectedWbsOrder);

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele) => ele.innerHTML)).toEqual(expectedWbsOrder);
  });

  it('handles sorting and reverse sorting the table by duration', async () => {
    renderComponent(exampleAllProjects);

    const column: string = 'Duration';
    const expectedWbsOrder: string[] = [
      exampleProject2,
      exampleProject5,
      exampleProject3,
      exampleProject4,
      exampleProject1
    ].map((prj: Project) => wbsPipe(prj.wbsNum));

    fireEvent.click(screen.getByText(column));
    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele) => ele.innerHTML)).toEqual(expectedWbsOrder.reverse());

    fireEvent.click(screen.getByText(column));
    const wbsNumsAsc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsAsc.map((ele) => ele.innerHTML)).toEqual(expectedWbsOrder.reverse());
  });

  it('handles 1000 projects', async () => {
    const lotsOfProjects: Project[] = [];
    for (let index = 0; index < 1000; index++) {
      lotsOfProjects[index] = exampleProject2;
    }

    renderComponent(lotsOfProjects);

    const expectedWbsOrder: string[] = [];
    for (let index = 0; index < 1000; index++) {
      expectedWbsOrder[index] = wbsPipe(exampleProject2.wbsNum);
    }

    const wbsNumsDesc: HTMLElement[] = await screen.findAllByText(wbsRegex);
    expect(wbsNumsDesc.map((ele) => ele.innerHTML)).toEqual(expectedWbsOrder);
  });

  // test for a basic normal case

  // https://testing-library.com/docs/react-testing-library/example-intro
});
