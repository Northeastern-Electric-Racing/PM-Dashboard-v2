import { Context } from 'aws-lambda';
import { ChangeRequest } from 'utils';

export async function handler(event: any, context: Context) {
  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('')
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}
