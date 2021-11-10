/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import {
  ActivationChangeRequest,
  ChangeRequest,
  ChangeRequestReason,
  ChangeRequestType,
  StageGateChangeRequest,
  StandardChangeRequest
} from 'utils/src';
import { exampleAdminUser, exampleProjectLeadUser, exampleProjectManagerUser } from './users.stub';
import { exampleWbsWorkPackage1 } from './wbs-numbers.stub';

export const exampleStandardChangeRequest: StandardChangeRequest = {
  id: 37,
  wbsNum: exampleWbsWorkPackage1,
  submitter: exampleAdminUser,
  dateSubmitted: new Date('02/25/21'),
  type: ChangeRequestType.DesignIssue,
  dateReviewed: new Date('03/01/21'),
  accepted: true,
  reviewNotes: 'Adjust description, increase budget to 200, and add 3 weeks',
  dateImplemented: new Date('03/04/21'),
  what: 'Spacers are needed to prevent the jet fuel from melting the I beams',
  why: [
    {
      reason: ChangeRequestReason.Estimation,
      explain: 'Original estimate did not account for spacers'
    },
    {
      reason: ChangeRequestReason.Manufacturing,
      explain: 'No availibilitiy in Richards'
    },
    {
      reason: ChangeRequestReason.Other,
      explain: "Matt won't shut up"
    },
    {
      reason: ChangeRequestReason.OtherProject,
      explain: '2.2.0'
    },
    {
      reason: ChangeRequestReason.Rules,
      explain: 'Discovered rule EV 5.2.6'
    },
    {
      reason: ChangeRequestReason.School,
      explain: 'All team members had 5 midterms each'
    }
  ],
  scopeImpact: 'Design and machine titanium spacers',
  budgetImpact: 75,
  timelineImpact: 2
};

export const exampleActivationChangeRequest: ActivationChangeRequest = {
  id: 69,
  wbsNum: exampleWbsWorkPackage1,
  submitter: exampleAdminUser,
  dateSubmitted: new Date('02/25/21'),
  type: ChangeRequestType.Activation,
  projectLead: exampleProjectLeadUser,
  projectManager: exampleProjectManagerUser,
  startDate: new Date('03/01/21'),
  confirmDetails: true
};

export const exampleStageGateChangeRequest: StageGateChangeRequest = {
  id: 93,
  wbsNum: exampleWbsWorkPackage1,
  submitter: exampleAdminUser,
  dateSubmitted: new Date('02/25/21'),
  type: ChangeRequestType.StageGate,
  leftoverBudget: 26,
  confirmCompleted: true
};

export const exampleAllChangeRequests: ChangeRequest[] = [
  exampleStandardChangeRequest,
  exampleActivationChangeRequest,
  exampleStageGateChangeRequest
];
