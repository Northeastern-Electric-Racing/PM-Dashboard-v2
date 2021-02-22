/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Context } from 'aws-lambda';
import { example } from 'utils';

export async function handler(event: any, context: Context) {
  const num: number = example(5, 6);
  try {
    return { statusCode: 200, body: 'example! ' + num };
    // eslint-disable-next-line no-unreachable
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
