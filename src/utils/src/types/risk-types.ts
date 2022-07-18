/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import { bodySchema, intType, stringType, booleanType } from './api-utils-types';

export const riskEditInputSchemaBody = bodySchema({
  userId: intType,
  id: intType,
  detail: stringType,
  resolved: booleanType
});

export type EditRiskPayload = FromSchema<typeof riskEditInputSchemaBody>;
