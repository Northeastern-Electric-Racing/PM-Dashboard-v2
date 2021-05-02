/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Handler } from '@netlify/functions';
import { exampleAllWorkPackages } from 'utils';

const handler: Handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exampleAllWorkPackages)
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
};

export { handler };
