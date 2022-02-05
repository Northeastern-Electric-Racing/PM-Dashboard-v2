/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import { bodySchema, intType, stringType, dateType, arrayType, enumType } from './api-utils-types';

export const workPackageCreateInputSchemaBody = bodySchema({
  userId: intType,
  name: stringType,
  crId: intType,
  projectId: intType,
  startDate: dateType,
  duration: intType,
  dependencies: arrayType(intType),
  expectedActivities: arrayType(stringType),
  deliverables: arrayType(stringType)
});

export type CreateWorkPackagePayload = FromSchema<typeof workPackageCreateInputSchemaBody>;

export const workPackageEditInputSchemaBody = bodySchema(
  {
    wbsElementId: intType,
    userId: intType,
    name: stringType,
    crId: intType,
    startDate: dateType,
    duration: intType,
    dependencies: arrayType(intType),
    expectedActivities: arrayType(bodySchema({ id: intType, detail: stringType })),
    deliverables: arrayType(bodySchema({ id: intType, detail: stringType })),
    wbsElementStatus: enumType('INACTIVE', 'ACTIVE', 'COMPLETE'),
    progress: intType,
    projectLead: intType,
    projectManager: intType
  },
  ['projectLead', 'projectManager']
);

export type EditWorkPackagePayload = FromSchema<typeof workPackageEditInputSchemaBody>;
