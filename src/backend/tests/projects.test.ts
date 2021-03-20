/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project, exampleAllProjects } from 'utils';

describe('all example projects', () => {
  it('contains 5 projects', () => {
    expect(exampleAllProjects.length).toBe(5);
  });

  it('has all required fields', () => {
    exampleAllProjects.forEach((prj) => {
      expect(prj.hasOwnProperty('wbsNum')).toBeTruthy();
      expect(prj.hasOwnProperty('name')).toBeTruthy();
      expect(prj.hasOwnProperty('projectLead')).toBeTruthy();
      expect(prj.hasOwnProperty('projectManager')).toBeTruthy();
    });
  });

  it('has proper project wbsNums', () => {
    exampleAllProjects.forEach((prj) => {
      const project: Project = prj;
      expect(project.wbsNum).toBeTruthy();
      expect(project.wbsNum.workPackage).toEqual(0);
    });
  });
});
