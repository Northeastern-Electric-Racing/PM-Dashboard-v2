/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import {
  bodySchema,
  intType,
  stringType,
  dateType,
  arrayType,
  enumType,
  wbsNumType
} from './api-utils-types';
import { WbsElementStatus } from './project-types';

export const workPackageCreateInputSchemaBody = bodySchema({
  userId: intType,
  name: stringType,
  crId: intType,
  projectWbsNum: wbsNumType,
  startDate: dateType,
  duration: intType,
  dependencies: arrayType(wbsNumType),
  expectedActivities: arrayType(stringType),
  deliverables: arrayType(stringType)
});

export type CreateWorkPackagePayload = FromSchema<typeof workPackageCreateInputSchemaBody>;

export const workPackageEditInputSchemaBody = bodySchema(
  {
    workPackageId: intType,
    userId: intType,
    name: stringType,
    crId: intType,
    startDate: dateType,
    duration: intType,
    dependencies: arrayType(wbsNumType),
    expectedActivities: arrayType(bodySchema({ id: intType, detail: stringType })),
    deliverables: arrayType(bodySchema({ id: intType, detail: stringType })),
    wbsElementStatus: enumType(
      WbsElementStatus.Active,
      WbsElementStatus.Inactive,
      WbsElementStatus.Complete
    ),
    progress: intType,
    projectLead: intType,
    projectManager: intType
  },
  ['projectLead', 'projectManager']
);

export type EditWorkPackagePayload = FromSchema<typeof workPackageEditInputSchemaBody>;

export enum TimelineStatus {
  Ahead = 'AHEAD',
  OnTrack = 'ON_TRACK',
  Behind = 'BEHIND',
  VeryBehind = 'VERY_BEHIND'
}
