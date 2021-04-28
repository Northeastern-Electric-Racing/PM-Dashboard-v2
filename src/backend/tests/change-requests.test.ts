import { apiRoutes, ChangeRequest, mockContext } from 'utils';
import { handler } from '../functions/change-requests';

describe('change requests api endpoint handler', () => {
  describe('all change requests route', () => {
    let responseObject: any;
    let crResponse: ChangeRequest[];

    beforeEach(async () => {
      const event = { path: apiRoutes.CHANGE_REQUESTS, httpMethod: 'GET' };
      responseObject = await handler(event, mockContext);
      crResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('has json headers', () => {
      expect(responseObject.headers).toStrictEqual({ 'Content-Type': 'application/json' });
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
      const event = { path: `${apiRoutes.CHANGE_REQUESTS}/37`, httpMethod: 'GET' };
      responseObject = await handler(event, mockContext);
      crResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('has json headers', () => {
      expect(responseObject.headers).toStrictEqual({ 'Content-Type': 'application/json' });
    });

    it('has all required fields', () => {
      expect(crResponse.hasOwnProperty('id')).toBeTruthy();
      expect(crResponse.hasOwnProperty('wbsNum')).toBeTruthy();
      expect(crResponse.hasOwnProperty('submitter')).toBeTruthy();
      expect(crResponse.hasOwnProperty('dateSubmitted')).toBeTruthy();
      expect(crResponse.hasOwnProperty('type')).toBeTruthy();
    });

    it('handles 404 when project not found', async () => {
      const event = { path: `${apiRoutes.CHANGE_REQUESTS}/38`, httpMethod: 'GET' };
      responseObject = await handler(event, mockContext);
      const message: string = responseObject.body;

      expect(responseObject.statusCode).toBe(404);
      expect(message).toEqual('Could not find the requested change request.');
    });
  });
});
