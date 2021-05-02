/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerResponse } from '@netlify/functions';
import { API_URL } from '../src/api-routes';
import { buildResponseObject, routeMatcher } from '../src/api-utils';
import { exampleApiRoutes, mockContext } from '../src/dummy-data';

describe('Response object factory', () => {
  it('works with all inputs', () => {
    const response: HandlerResponse = buildResponseObject(200, { message: 'hi' }, { test: 'bye' });

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
    const response: HandlerResponse = buildResponseObject(200, { message: 'hi' });

    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');

    expect(response.headers).toBeUndefined();
    expect(response.isBase64Encoded).toBeUndefined();
    expect(response.multiValueHeaders).toBeUndefined();
  });

  it('properly stringifies the body', () => {
    const response: HandlerResponse = buildResponseObject(200, { message: 'hi' });

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');
    expect(JSON.parse(response.body)).toHaveProperty('message', 'hi');
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
