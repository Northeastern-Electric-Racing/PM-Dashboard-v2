/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import { bodySchema, intType, stringType } from './api-utils-types';

export const riskCreateInputSchemaBody = bodySchema({
  projectId: intType,
  detail: stringType,
  createdById: intType
});

export type CreateRiskPayload = FromSchema<typeof riskCreateInputSchemaBody>;
