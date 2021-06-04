/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerResponse } from '@netlify/functions';
import { exampleApiRoutes, mockContext } from '../../test-support/test-data/test-utils.stub';
import { API_URL } from '../src/api-routes';
import {
  buildResponse,
  buildServerFailureResponse,
  buildNotFoundResponse,
  buildSuccessResponse,
  routeMatcher
} from '../src/api-utils';

describe('Response object factory', () => {
  it('works with all inputs', () => {
    const response: HandlerResponse = buildResponse(200, { message: 'hi' }, { test: 'bye' });

    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');

    expect(response.headers).toBeDefined();
    expect(response.headers).toHaveProperty('test');

    expect(response.isBase64Encoded).toBeUndefined();
    expect(response.multiValueHeaders).toBeUndefined();
  });

  it('works with no headers inputs', () => {
    const response: HandlerResponse = buildResponse(200, { message: 'hi' });

    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');

    expect(response.headers).toBeUndefined();
    expect(response.isBase64Encoded).toBeUndefined();
    expect(response.multiValueHeaders).toBeUndefined();
  });

  it('properly stringifies the body', () => {
    const response: HandlerResponse = buildResponse(200, { message: 'hi' });

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');
    expect(JSON.parse(response.body)).toHaveProperty('message', 'hi');
  });
});

describe('Response object factory implementations', () => {
  it('works for failure response', () => {
    const response: HandlerResponse = buildServerFailureResponse('it did not work');

    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(500);

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');

    const body = JSON.parse(response.body);
    expect(body.message).toBeDefined();
    expect(typeof body.message).toBe('string');
    expect(body.message).toBe('it did not work');

    expect(response.headers).toBeUndefined();
    expect(response.isBase64Encoded).toBeUndefined();
    expect(response.multiValueHeaders).toBeUndefined();
  });

  it('works for not found response', () => {
    const response: HandlerResponse = buildNotFoundResponse('project', '1.25.0');

    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(404);

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');

    const body = JSON.parse(response.body);
    expect(body.message).toBeDefined();
    expect(typeof body.message).toBe('string');
    expect(body.message).toBe('Could not find the requested project [1.25.0].');

    expect(response.headers).toBeUndefined();
    expect(response.isBase64Encoded).toBeUndefined();
    expect(response.multiValueHeaders).toBeUndefined();
  });

  it('works for success response', () => {
    const response: HandlerResponse = buildSuccessResponse({ test: 'hi' });

    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');

    const body = JSON.parse(response.body);
    expect(body.test).toBeDefined();
    expect(typeof body.test).toBe('string');
    expect(body.test).toBe('hi');

    expect(response.headers).toBeUndefined();
    expect(response.isBase64Encoded).toBeUndefined();
    expect(response.multiValueHeaders).toBeUndefined();
  });
});

describe('Route matcher behavior', () => {
  it('matches with no prefix', () => {
    const exampleEvent: any = { path: '/projects/one', httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, mockContext).body).toBe('5');
  });

  it('matches with prefix', () => {
    const exampleEvent: any = { path: `${API_URL}/projects/one`, httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, mockContext).body).toBe('5');
  });

  it('matches to the first route', () => {
    const exampleEvent: any = { path: '/projects/one', httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, mockContext).body).toBe('5');
  });

  it('matches to the second route', () => {
    const exampleEvent: any = { path: '/projects/one', httpMethod: 'POST' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, mockContext).body).toBe('6');
  });

  it('matches to the third route', () => {
    const exampleEvent: any = { path: '/projects/two', httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, mockContext).body).toBe('7');
  });

  it('matches to the fourth route', () => {
    const exampleEvent: any = { path: '/projects/three', httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, mockContext).body).toBe('8');
  });
});
