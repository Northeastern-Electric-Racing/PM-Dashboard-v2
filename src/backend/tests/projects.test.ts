import { Project } from '../../types/project-types';
import { exampleAllProjects } from '../functions/projects';

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
      const wbs: Array<String> = project.wbsNum.split('.');
      expect(project.wbsNum).toBeTruthy();
      expect(wbs[wbs.length - 1]).toEqual('0');
    });
  });
});
