/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import { User } from './user-types';
import { WbsNumber } from './project-types';
import { bodySchema, intType, stringType, booleanType } from './api-utils-types';

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
  reason: ChangeRequestReason;
  explain: string;
}

export enum ChangeRequestReason {
  Estimation = 'ESTIMATION',
  School = 'SCHOOL',
  Manufacturing = 'MANUFACTURING',
  Design = 'DESIGN',
  Rules = 'RULES',
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

export const newStandardChangeRequestPayloadSchema = {
  type: 'object',
  properties: {
    type: { 
      type: 'string', 
      enum: [
            ChangeRequestType.Other, 
            ChangeRequestType.Issue, 
            ChangeRequestType.Redefinition
            ] },
    what: { type: 'string' },
    scopeImpact: { type: 'string' },
    timelineImpact: { type: 'integer', minimum: 0 },
    budgetImpact: { type: 'integer', minimum: 0 },
    why: {
      type: 'array',
      items: {
        additionalProperties: false,
        type: 'object',
        properties: {
          explain: { type: 'string' },
          type: {
            type: 'string',
            enum: [
              ChangeRequestReason.Estimation,
              ChangeRequestReason.Manufacturing,
              ChangeRequestReason.Other,
              ChangeRequestReason.OtherProject,
              ChangeRequestReason.Rules,
              ChangeRequestReason.School,
              ChangeRequestReason.Design,
            ]
          }
        },
        required: ['explain', 'type']
      },
      minItems: 1,
      uniqueItems: true
    },
  },
  required: ['what', 'scopeImpact', 'timelineImpact', 'budgetImpact', 'why'],
  additionalProperties: false,
} as const;

export const newActivationChangeRequestPayloadSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: [ChangeRequestType.Activation] },
    projectLeadId: { type: 'integer', minimum: 0 },
    projectManagerId: { type: 'integer', minimum: 0 },
    startDate: { type: 'string' },
    confirmDetails: { type: 'boolean' }
  },
  required: ['projectLeadId', 'projectManagerId', 'startDate', 'confirmDetails'],
  additionalProperties: false,
} as const;

export const newStageChangeRequestPayloadSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: [ChangeRequestType.StageGate] },
    leftoverBudget: { type: 'integer', minimum: 0 },
    confirmDone: { type: 'boolean' }
  },
  required: ['leftoverBudget', 'confirmDone'],
  additionalProperties: false,
} as const;

export const newChangeRequestPayloadSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    submitterId: { type: 'integer', minimum: 0 },
    wbsElementId: { type: 'integer', minimum: 0 },
    type: {
      enum: [
        ChangeRequestType.Activation,
        ChangeRequestType.StageGate,
        ChangeRequestType.Other,
        ChangeRequestType.Issue,
        ChangeRequestType.Redefinition
      ]
    },
    payload: {
      oneOf: [
        newStandardChangeRequestPayloadSchema,
        newActivationChangeRequestPayloadSchema,
        newStageChangeRequestPayloadSchema
      ]
    }
  },
  required: ['submitterId', 'wbsElementId', 'type', 'payload'],
} as const;

export type ReviewChangeRequestPayload = FromSchema<typeof reviewChangeRequestPayloadSchema>;

export type NewStandardChangeRequestPayload = FromSchema<typeof newStandardChangeRequestPayloadSchema>;

export type NewActivationChangeRequestPayload = FromSchema<typeof newActivationChangeRequestPayloadSchema>;

export type NewStageRequestChangeRequestPayload = FromSchema<typeof newStageChangeRequestPayloadSchema>;

export type NewChangeRequestPayload = FromSchema<typeof newChangeRequestPayloadSchema>;