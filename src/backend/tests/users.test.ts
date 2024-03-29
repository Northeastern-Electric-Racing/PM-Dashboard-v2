/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerEvent } from '@netlify/functions';
import { User } from '@prisma/client';
import { apiUrls } from '../../shared/urls';
import { mockCallback, mockContext, mockEvent } from '../../test-support/test-data/test-utils.stub';
import { handler } from '../functions/users';

// BACKEND TESTS MUST HAVE DATABASE RUNNING?

const expectUserFields = (user: User) => {
  expect(user).toHaveProperty('userId');
  expect(user).toHaveProperty('firstName');
  expect(user).toHaveProperty('lastName');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('role');
};

describe('users api endpoint handler', () => {
  describe('all users route', () => {
    let responseObject: any;
    let usersResponse: User[];

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(apiUrls.users(), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      usersResponse = JSON.parse(responseObject.body);
    });

    it.skip('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it.skip('contains 5 projects', () => {
      expect(usersResponse.length).toBeTruthy();
    });

    it.skip('has all required fields', () => {
      usersResponse.forEach((usr: User) => {
        expectUserFields(usr);
      });
    });
  });

  describe('single user route', () => {
    let responseObject: any;
    let userResponse: User;

    beforeEach(async () => {
      const event: HandlerEvent = mockEvent(apiUrls.usersById('1'), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      userResponse = JSON.parse(responseObject.body);
    });

    it.skip('has 200 status code', () => {
      expect(responseObject.statusCode).toBe(200);
    });

    it.skip('has all required fields', () => {
      expectUserFields(userResponse);
    });

    it.skip('handles 404 when user not found', async () => {
      const event: HandlerEvent = mockEvent(apiUrls.usersById('420'), 'GET');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual('Could not find the requested user [#420].');
    });
  });

  describe('login route', () => {
    let responseObject: any;

    it.skip('handles 404 when user not found', async () => {
      const event: HandlerEvent = mockEvent(apiUrls.usersLogin(), 'POST', {
        id_token: 'not.a'
      });
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(404);
      expect(errorObject.message).toEqual('Could not find the requested user [not.a].');
    });

    it('throws when no id_token is provided in the body', async () => {
      const event: HandlerEvent = mockEvent(apiUrls.usersLogin(), 'POST', {});
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(400);
      expect(errorObject.message).toEqual('Client error: No id_token found for login.');
    });

    it('throws when no body', async () => {
      const event: HandlerEvent = mockEvent(apiUrls.usersLogin(), 'POST');
      responseObject = await handler(event, mockContext, mockCallback);
      const errorObject = JSON.parse(responseObject.body);

      expect(responseObject.statusCode).toBe(400);
      expect(errorObject.message).toEqual('Client error: No user info found for login.');
    });

    it.todo('last login is within the last minute');

    it.todo('logs the login');
  });
});
