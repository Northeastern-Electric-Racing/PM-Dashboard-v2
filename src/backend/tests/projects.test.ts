/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent } from '@netlify/functions';
import { Project, mockContext, mockCallback, API_URL, apiRoutes, mockEvent } from 'utils';
import { handler } from '../functions/projects';

describe('projects api endpoint handler', () => {
  describe('all projects route', () => {
    let responseObject: any;
    let projectsResponse: Project[];

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.PROJECTS}`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      projectsResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
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
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.PROJECTS}/1.2.0`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      projectResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
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

    it('handles 404 when project not found', async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.PROJECTS}/1.0.0`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual('Could not find the requested project [WBS # 1.0.0].');
    });
  });
});
