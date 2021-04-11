/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Context } from 'aws-lambda';
import { exampleAllProjects } from 'utils';

export async function handler(event: any, context: Context) {
  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exampleAllProjects)
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}
