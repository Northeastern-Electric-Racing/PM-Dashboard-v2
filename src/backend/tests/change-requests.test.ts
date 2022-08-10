/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent } from '@netlify/functions';
import { ChangeRequest } from 'utils';
import { apiUrls } from '../../shared/urls';
import { mockCallback, mockContext, mockEvent } from '../../test-support/test-data/test-utils.stub';
import { handler } from '../functions/change-requests';

describe('change requests api endpoint handler', () => {
  describe('all change requests route', () => {
    let responseObject: any;
    let crResponse: ChangeRequest[];

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(apiUrls.changeRequests(), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      crResponse = JSON.parse(responseObject.body);
    });

    it.skip('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it.skip('contains 3 change requests', () => {
      expect(crResponse.length).toBe(3);
    });

    it.skip('has all required fields', () => {
      crResponse.forEach((cr: ChangeRequest) => {
        expect(cr.hasOwnProperty('crId')).toBeTruthy();
        expect(cr.hasOwnProperty('wbsNum')).toBeTruthy();
        expect(cr.hasOwnProperty('submitter')).toBeTruthy();
        expect(cr.hasOwnProperty('dateSubmitted')).toBeTruthy();
        expect(cr.hasOwnProperty('type')).toBeTruthy();
      });
    });
  });

  describe('single change request route', () => {
    let responseObject: any;
    let crResponse: ChangeRequest;

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(apiUrls.changeRequestsById('37'), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      crResponse = JSON.parse(responseObject.body);
    });

    it.skip('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it.skip('has all required fields', () => {
      expect(crResponse.hasOwnProperty('crId')).toBeTruthy();
      expect(crResponse.hasOwnProperty('wbsNum')).toBeTruthy();
      expect(crResponse.hasOwnProperty('submitter')).toBeTruthy();
      expect(crResponse.hasOwnProperty('dateSubmitted')).toBeTruthy();
      expect(crResponse.hasOwnProperty('type')).toBeTruthy();
    });

    it.skip('handles 404 when project not found', async () => {
      const event: HandlerEvent = mockEvent(apiUrls.changeRequestsById('105'), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual('Could not find the requested change request [#105].');
    });
  });
});
