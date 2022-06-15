/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import { User } from './user-types';
import { WbsNumber } from './project-types';
import {
  bodySchema,
  intType,
  stringType,
  booleanType,
  wbsNumType,
  enumType,
  dateType,
  arrayType
} from './api-utils-types';

export interface ChangeRequest {
  crId: number;
  wbsNum: WbsNumber;
  submitter: User;
  dateSubmitted: Date;
  type: ChangeRequestType;
  reviewer?: User;
  dateReviewed?: Date;
  accepted?: boolean;
  reviewNotes?: string;
  dateImplemented?: Date;
  implementedChanges?: ImplementedChange[];
}

export const ChangeRequestType = {
  Issue: 'ISSUE',
  Redefinition: 'DEFINITION_CHANGE',
  Other: 'OTHER',
  StageGate: 'STAGE_GATE',
  Activation: 'ACTIVATION'
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ChangeRequestType = typeof ChangeRequestType[keyof typeof ChangeRequestType];

export interface StandardChangeRequest extends ChangeRequest {
  what: string;
  why: ChangeRequestExplanation[];
  scopeImpact: string;
  budgetImpact: number;
  timelineImpact: number;
}

export interface ActivationChangeRequest extends ChangeRequest {
  projectLead: User;
  projectManager: User;
  startDate: Date;
  confirmDetails: boolean;
}

export interface StageGateChangeRequest extends ChangeRequest {
  leftoverBudget: number;
  confirmDone: boolean;
}

export interface ChangeRequestExplanation {
  type: ChangeRequestReason;
  explain: string;
}

export enum ChangeRequestReason {
  Estimation = 'ESTIMATION',
  School = 'SCHOOL',
  Design = 'DESIGN',
  Manufacturing = 'MANUFACTURING',
  Rules = 'RULES',
  Initialization = 'INITIALIZATION',
  Competition = 'COMPETITION',
  Maintenance = 'MAINTENANCE',
  OtherProject = 'OTHER_PROJECT',
  Other = 'OTHER'
}

export interface ImplementedChange {
  changeId: number;
  changeRequestId: number;
  wbsNum: WbsNumber;
  implementer: User;
  detail: string;
  dateImplemented: Date;
}

export const reviewChangeRequestPayloadSchema = bodySchema({
  reviewerId: intType,
  crId: intType,
  reviewNotes: stringType,
  accepted: booleanType
});

export type ReviewChangeRequestPayload = FromSchema<typeof reviewChangeRequestPayloadSchema>;

export const createActivationChangeRequestPayloadSchema = bodySchema({
  submitterId: intType,
  wbsNum: wbsNumType,
  type: enumType(ChangeRequestType.Activation),
  projectLeadId: intType,
  projectManagerId: intType,
  startDate: dateType,
  confirmDetails: booleanType
});

export type CreateActivationChangeRequestPayload = FromSchema<
  typeof createActivationChangeRequestPayloadSchema
>;

export const createStageGateChangeRequestPayloadSchema = bodySchema({
  submitterId: intType,
  wbsNum: wbsNumType,
  type: enumType(ChangeRequestType.StageGate),
  leftoverBudget: intType,
  confirmDone: booleanType
});

export type CreateStageGateChangeRequestPayload = FromSchema<
  typeof createStageGateChangeRequestPayloadSchema
>;

export const createStandardChangeRequestPayloadSchema = bodySchema({
  submitterId: intType,
  wbsNum: wbsNumType,
  type: enumType(ChangeRequestType.Other, ChangeRequestType.Issue, ChangeRequestType.Redefinition),
  what: stringType,
  scopeImpact: stringType,
  budgetImpact: intType,
  timelineImpact: intType,
  why: arrayType(
    bodySchema({
      type: enumType(
        ChangeRequestReason.Estimation,
        ChangeRequestReason.School,
        ChangeRequestReason.Design,
        ChangeRequestReason.Manufacturing,
        ChangeRequestReason.Rules,
        ChangeRequestReason.Initialization,
        ChangeRequestReason.Competition,
        ChangeRequestReason.Maintenance,
        ChangeRequestReason.OtherProject,
        ChangeRequestReason.Other
      ),
      explain: stringType
    }),
    1
  )
});

export type CreateStandardChangeRequestPayload = FromSchema<
  typeof createStandardChangeRequestPayloadSchema
>;
