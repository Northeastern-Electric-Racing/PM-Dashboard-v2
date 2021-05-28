/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent } from '@netlify/functions';
import { User, API_URL, apiRoutes } from 'utils';
import { mockCallback, mockContext, mockEvent } from '../../test-support/test-data/test-utils.stub';
import { handler } from '../functions/users';

describe('users api endpoint handler', () => {
  describe('all users route', () => {
    let responseObject: any;
    let usersResponse: User[];

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.USERS}`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      usersResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('contains 5 projects', () => {
      expect(usersResponse.length).toBe(7);
    });

    it('has all required fields', () => {
      usersResponse.forEach((usr: User) => {
        expect(usr).toHaveProperty('id');
        expect(usr).toHaveProperty('firstName');
        expect(usr).toHaveProperty('lastName');
        expect(usr).toHaveProperty('emailId');
        expect(usr).toHaveProperty('firstLogin');
        expect(usr).toHaveProperty('lastLogin');
        expect(usr).toHaveProperty('role');
      });
    });
  });

  describe('single user route', () => {
    let responseObject: any;
    let userResponse: User;

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.USERS}/1`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      userResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('has all required fields', () => {
      expect(userResponse).toHaveProperty('id');
      expect(userResponse).toHaveProperty('firstName');
      expect(userResponse).toHaveProperty('lastName');
      expect(userResponse).toHaveProperty('emailId');
      expect(userResponse).toHaveProperty('firstLogin');
      expect(userResponse).toHaveProperty('lastLogin');
      expect(userResponse).toHaveProperty('role');
    });

    it('handles 404 when user not found', async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.USERS}/420`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual('Could not find the requested user [#420].');
    });
  });
});
