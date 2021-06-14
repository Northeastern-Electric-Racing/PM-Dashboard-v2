/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerCallback, HandlerContext, HandlerEvent } from '@netlify/functions';
import { AxiosResponse } from 'axios';
import { ApiRoute, API_URL } from 'utils';

export const exampleApiRoutes: ApiRoute[] = [
  {
    path: `${API_URL}/projects/one`,
    httpMethod: 'GET',
    func: () => {
      return { statusCode: 200, body: '5' };
    }
  },
  {
    path: `${API_URL}/projects/one`,
    httpMethod: 'POST',
    func: () => {
      return { statusCode: 200, body: '6' };
    }
  },
  {
    path: `${API_URL}/projects/two`,
    httpMethod: 'GET',
    func: () => {
      return { statusCode: 200, body: '7' };
    }
  },
  {
    path: `${API_URL}/projects/three`,
    httpMethod: 'GET',
    func: () => {
      return { statusCode: 200, body: '8' };
    }
  }
];

export const mockContext: HandlerContext = {
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: '',
  awsRequestId: '',
  logGroupName: '',
  logStreamName: '',
  callbackWaitsForEmptyEventLoop: false,
  getRemainingTimeInMillis: () => 0,
  done: () => 0,
  fail: () => 0,
  succeed: () => 0
};

export const mockCallback: HandlerCallback = (_error, _response) => {};

export const mockEvent = (path: string, httpMethod: string, body?: any): HandlerEvent => {
  return {
    rawUrl: '',
    rawQuery: '',
    path,
    httpMethod,
    headers: {},
    multiValueHeaders: {},
    queryStringParameters: {},
    multiValueQueryStringParameters: {},
    body: body ? JSON.stringify(body) : null,
    isBase64Encoded: false
  };
};

export const mockPromiseAxiosResponse = <Return>(data: Return) => {
  return new Promise((res, rej) =>
    res({ status: 0, statusText: '', headers: null, config: {}, data })
  ) as Promise<AxiosResponse<Return>>;
};
