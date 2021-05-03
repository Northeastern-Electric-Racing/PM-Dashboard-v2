/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent } from '@netlify/functions';
import { apiRoutes, API_URL, ChangeRequest, mockContext, mockCallback, mockEvent } from 'utils';
import { handler } from '../functions/change-requests';

describe('change requests api endpoint handler', () => {
  describe('all change requests route', () => {
    let responseObject: any;
    let crResponse: ChangeRequest[];

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(API_URL + apiRoutes.CHANGE_REQUESTS, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      crResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('contains 3 change requests', () => {
      expect(crResponse.length).toBe(3);
    });

    it('has all required fields', () => {
      crResponse.forEach((cr: ChangeRequest) => {
        expect(cr.hasOwnProperty('id')).toBeTruthy();
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
      const event: HandlerEvent = mockEvent(`${API_URL + apiRoutes.CHANGE_REQUESTS}/37`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      crResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('has all required fields', () => {
      expect(crResponse.hasOwnProperty('id')).toBeTruthy();
      expect(crResponse.hasOwnProperty('wbsNum')).toBeTruthy();
      expect(crResponse.hasOwnProperty('submitter')).toBeTruthy();
      expect(crResponse.hasOwnProperty('dateSubmitted')).toBeTruthy();
      expect(crResponse.hasOwnProperty('type')).toBeTruthy();
    });

    it('handles 404 when project not found', async () => {
      const event: HandlerEvent = mockEvent(`${API_URL + apiRoutes.CHANGE_REQUESTS}/105`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual('Could not find the requested change request [#105].');
    });
  });
});
