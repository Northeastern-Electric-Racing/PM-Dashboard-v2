/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent } from '@netlify/functions';
import { WorkPackage } from 'utils';
import { apiUrls } from '../../shared/urls';
import { mockCallback, mockContext, mockEvent } from '../../test-support/test-data/test-utils.stub';
import { handler } from '../functions/work-packages';

describe('work packages api endpoint handler', () => {
  describe('all work packages route', () => {
    let responseObject: any;
    let workPackagesResponse: WorkPackage[];

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(apiUrls.workPackages(), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      workPackagesResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('contains correct number of work packages', () => {
      expect(workPackagesResponse.length).toBe(3);
    });

    it('has all required fields', () => {
      workPackagesResponse.forEach((prj: WorkPackage) => {
        expect(prj).toHaveProperty('wbsNum');
        expect(prj).toHaveProperty('name');
        expect(prj).toHaveProperty('projectLead');
        expect(prj).toHaveProperty('projectManager');
      });
    });

    it('has proper work package wbsNums', () => {
      workPackagesResponse.forEach((prj: WorkPackage) => {
        const project: WorkPackage = prj;
        expect(project.wbsNum).toBeTruthy();
        expect(typeof project.wbsNum).toBe('object');
      });
    });
  });

  describe('single project route', () => {
    let responseObject: any;
    let workPackageResponse: WorkPackage;

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(apiUrls.workPackagesByWbsNum('1.1.1'), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      workPackageResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });
    it('has all required fields', () => {
      expect(workPackageResponse).toHaveProperty('wbsNum');
      expect(workPackageResponse).toHaveProperty('name');
      expect(workPackageResponse).toHaveProperty('projectLead');
      expect(workPackageResponse).toHaveProperty('projectManager');
    });

    it('has proper work package wbsNums', () => {
      expect(workPackageResponse.wbsNum).toBeTruthy();
      expect(typeof workPackageResponse.wbsNum).toBe('object');
    });

    it('handles 404 when work package not found', async () => {
      const event: HandlerEvent = mockEvent(apiUrls.workPackagesByWbsNum('1.0.0'), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual(
        'Could not find the requested work package [WBS # 1.0.0].'
      );
    });
  });
});
