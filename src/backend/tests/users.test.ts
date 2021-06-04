/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent } from '@netlify/functions';
import { User, API_URL, apiRoutes } from 'utils';
import { mockCallback, mockContext, mockEvent } from '../../test-support/test-data/test-utils.stub';
import { exampleAdminUser } from '../../test-support/test-data/users.stub';
import { handler } from '../functions/users';

const expectUserFields = (user: User) => {
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('firstName');
  expect(user).toHaveProperty('lastName');
  expect(user).toHaveProperty('emailId');
  expect(user).toHaveProperty('firstLogin');
  expect(user).toHaveProperty('lastLogin');
  expect(user).toHaveProperty('role');
};

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
        expectUserFields(usr);
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
      expectUserFields(userResponse);
    });

    it('handles 404 when user not found', async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.USERS}/420`, 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual('Could not find the requested user [#420].');
    });
  });

  describe('login route', () => {
    let responseObject: any;
    let userResponse: User;

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.USERS}:login`, 'POST', {
        emailId: exampleAdminUser.emailId
      });
      responseObject = await handler(event, mockContext, mockCallback);
      userResponse = JSON.parse(responseObject.body);
    });

    it('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it('has all required fields', () => {
      expectUserFields(userResponse);
    });

    it('handles 404 when user not found', async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.USERS}:login`, 'POST', {
        emailId: 'not.a'
      });
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual('Could not find the requested user [not.a].');
    });

    it('throws when no emailId is provided in the body', async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.USERS}:login`, 'POST', {});
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(500);
      expect(errorObject.message).toEqual('No emailId found for login.');
    });

    it('throws when no body', async () => {
      const event: HandlerEvent = mockEvent(`${API_URL}${apiRoutes.USERS}:login`, 'POST');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(500);
      expect(errorObject.message).toEqual('No user info found for login.');
    });

    it.todo('last login is within the last minute');

    it.todo('logs the login');
  });
});
