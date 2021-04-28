/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { API_URL } from '../src/api-routes';
import { routeMatcher } from '../src/api-utils';
import { exampleApiRoutes } from '../src/dummy-data';

describe('Route matcher behavior', () => {
  it('matches with no prefix', () => {
    const exampleEvent: any = { path: '/projects/one', httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, {})).toBe(5);
  });

  it('matches with prefix', () => {
    const exampleEvent: any = { path: `${API_URL}/projects/one`, httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, {})).toBe(5);
  });

  it('matches to the first route', () => {
    const exampleEvent: any = { path: '/projects/one', httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, {})).toBe(5);
  });

  it('matches to the second route', () => {
    const exampleEvent: any = { path: '/projects/one', httpMethod: 'POST' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, {})).toBe(6);
  });

  it('matches to the third route', () => {
    const exampleEvent: any = { path: '/projects/two', httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, {})).toBe(7);
  });

  it('matches to the fourth route', () => {
    const exampleEvent: any = { path: '/projects/three', httpMethod: 'GET' };
    expect(routeMatcher(exampleApiRoutes, exampleEvent, {})).toBe(8);
  });
});
