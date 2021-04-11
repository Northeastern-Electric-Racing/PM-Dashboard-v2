/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project, mockContext } from 'utils';
import { handler } from '../functions/projects';

describe('projects api endpoint handler', () => {
  describe('all projects route', () => {
    let responseObject: any;
    let projectsResponse: Project[];

    beforeEach(async () => {
      const event = { path: '/projects', httpMethod: 'GET' };
      responseObject = await handler(event, mockContext);
      projectsResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('has json headers', () => {
      expect(responseObject.headers).toStrictEqual({ 'Content-Type': 'application/json' });
    });

    it('contains 5 projects', () => {
      expect(projectsResponse.length).toBe(5);
    });

    it('has all required fields', () => {
      projectsResponse.forEach((prj: Project) => {
        expect(prj.hasOwnProperty('wbsNum')).toBeTruthy();
        expect(prj.hasOwnProperty('name')).toBeTruthy();
        expect(prj.hasOwnProperty('projectLead')).toBeTruthy();
        expect(prj.hasOwnProperty('projectManager')).toBeTruthy();
      });
    });

    it('has proper project wbsNums', () => {
      projectsResponse.forEach((prj: Project) => {
        const project: Project = prj;
        expect(project.wbsNum).toBeTruthy();
        expect(project.wbsNum.workPackage).toEqual(0);
      });
    });
  });

  describe('single project route', () => {
    let responseObject: any;
    let projectResponse: Project;

    beforeEach(async () => {
      const event = { path: '/projects/1.2.0', httpMethod: 'GET' };
      responseObject = await handler(event, mockContext);
      projectResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('has json headers', () => {
      expect(responseObject.headers).toStrictEqual({ 'Content-Type': 'application/json' });
    });

    it('has all required fields', () => {
      expect(projectResponse.hasOwnProperty('wbsNum')).toBeTruthy();
      expect(projectResponse.hasOwnProperty('name')).toBeTruthy();
      expect(projectResponse.hasOwnProperty('projectLead')).toBeTruthy();
      expect(projectResponse.hasOwnProperty('projectManager')).toBeTruthy();
    });

    it('has proper project wbsNums', () => {
      expect(projectResponse.wbsNum).toBeTruthy();
      expect(projectResponse.wbsNum.workPackage).toEqual(0);
    });
  });
});
