/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from './user-types';
import { WbsNumber } from './project-types';

export interface ChangeRequest {
  id: number;
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
  DesignIssue = 'Design Issue',
  NewFunction = 'New Function',
  Other = 'Other',
  StageGate = 'Stage Gate',
  Activation = 'Activation'
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
  confirmCompleted: boolean;
}

export interface ChangeRequestExplanation {
  reason: ChangeRequestReason;
  explain: string;
}

export enum ChangeRequestReason {
  Estimation = 'Estimation Error',
  School = 'School Work',
  Manufacturing = 'Manufacturing Issues',
  Rules = 'Rules Compliance',
  OtherProject = 'Other Project',
  Other = 'Other'
}

export interface ImplementedChange {
  id: number;
  crId: number;
  wbsNum: WbsNumber;
  implementer: User;
  detail: string;
}
