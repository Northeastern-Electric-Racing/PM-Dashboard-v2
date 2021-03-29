/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Context } from 'aws-lambda';
import { handler } from '../functions/users';

describe('users api endpoint handler', () => {
  const mockContext: Context = {
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

  it('returns an array of users', async () => {
    const usersResponse = await handler({}, mockContext);
    expect(usersResponse.statusCode).toBe(200);
    const parsedUserResponse = JSON.parse(usersResponse.body);
    expect(parsedUserResponse).toBeInstanceOf(Array);
    expect(parsedUserResponse).toHaveLength(7);
  });

  it('returns a user with properties', async () => {
    const usersResponse = await handler({}, mockContext);
    expect(usersResponse.statusCode).toBe(200);
    const parsedUserResponse = JSON.parse(usersResponse.body);
    expect(parsedUserResponse[0]).toHaveProperty('firstName');
    expect(parsedUserResponse[0]).toHaveProperty('lastName');
    expect(parsedUserResponse[0]).toHaveProperty('emailId');
  });
});
