/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import { User } from './user-types';
import { WbsNumber } from './project-types';
import { CR_Type, Scope_CR_Why_Type } from '@prisma/client';

export interface ChangeRequest {
  crId: number;
  wbsNum: WbsNumber;
  submitter: User;
  dateSubmitted: Date;
  type: ChangeRequestType;
  dateReviewed?: Date;
  accepted?: boolean;
  reviewNotes?: string;
  dateImplemented?: Date;
  implementedChanges?: ImplementedChange[];
}

export enum ChangeRequestType {
  DesignIssue = 'DESIGN_ISSUE',
  NewFunction = 'NEW_FUNCTION',
  Other = 'OTHER',
  StageGate = 'STAGE_GATE',
  Activation = 'ACTIVATION'
}

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
}

export const reviewChangeRequestPayloadSchema = {
  type: 'object',
  properties: {
    crId: { type: 'number', minimum: 0 },
    reviewNotes: { type: 'string' },
    accepted: { type: 'boolean' }
  },
  required: ['crId', 'reviewNotes', 'accepted'],
  additionalProperties: false
} as const;


export const newStandardChangeRequestPayloadSchema = {
  type: 'object',
  properties: {
    type: { 
      type: 'string', 
      enum: [
              CR_Type.OTHER, 
              CR_Type.ISSUE, 
              CR_Type.DEFINITION_CHANGE
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
              Scope_CR_Why_Type.ESTIMATION,
              Scope_CR_Why_Type.MANUFACTURING,
              Scope_CR_Why_Type.OTHER,
              Scope_CR_Why_Type.OTHER_PROJECT,
              Scope_CR_Why_Type.RULES,
              Scope_CR_Why_Type.SCHOOL
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
    type: { type: 'string', enum: [CR_Type.ACTIVATION] },
    projectLeadId: { type: 'integer', minimum: 0 },
    projectManagerId: { type: 'integer', minimum: 0 },
    startDate: { type: 'string', format: 'date' },
    confirmDetails: { type: 'boolean' }
  },
  required: ['projectLeadId', 'projectManagerId', 'startDate', 'confirmDetails'],
  additionalProperties: false,
} as const;

export const newStageChangeRequestPayloadSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: [CR_Type.STAGE_GATE] },
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
        CR_Type.ACTIVATION,
        CR_Type.STAGE_GATE,
        CR_Type.OTHER,
        CR_Type.ISSUE,
        CR_Type.DEFINITION_CHANGE
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