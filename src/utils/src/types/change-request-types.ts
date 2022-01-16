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

export type ReviewChangeRequestPayload = FromSchema<typeof reviewChangeRequestPayloadSchema>;
