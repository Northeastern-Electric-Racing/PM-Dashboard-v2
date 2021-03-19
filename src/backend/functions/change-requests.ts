import { Context } from 'aws-lambda';
import { ChangeRequest } from 'utils/src/types/change-request-types';

interface ChangeRequestResponse {
  statusCode: number;
  headers?: any;
  body?: string;
}

export async function handler(event: any, context: Context): Promise<ChangeRequestResponse> {
  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exampleCRs)
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

const changeRequest1: ChangeRequest = {
  id: 2,
  wbsNum: '1.1.2',
  submitter: 'John',
  type: 'Work Package'
};

const changeRequest2: ChangeRequest = {
  id: 5,
  wbsNum: '1.2.7',
  submitter: 'James',
  type: 'Work Package'
};

export const exampleCRs: ChangeRequest[] = [changeRequest1, changeRequest2];
