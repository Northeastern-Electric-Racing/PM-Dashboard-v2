/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FromSchema } from 'json-schema-to-ts';
import { User } from './user-types';
import { WbsNumber } from './project-types';

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
}

export const reviewChangeRequestPayloadSchema = {
  type: 'object',
  properties: {
    reviewerId: { type: 'number', minimum: 0 },
    crId: { type: 'number', minimum: 0 },
    reviewNotes: { type: 'string' },
    accepted: { type: 'boolean' }
  },
  required: ['reviewerId', 'crId', 'reviewNotes', 'accepted'],
  additionalProperties: false
} as const;

export type ReviewChangeRequestPayload = FromSchema<typeof reviewChangeRequestPayloadSchema>;
