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
} from 'utils';
import {
  exampleAdminUser,
  exampleAppAdminUser,
  exampleProjectLeadUser,
  exampleProjectManagerUser
} from './users.stub';
import { exampleWbsWorkPackage1 } from './wbs-numbers.stub';

export const exampleStandardChangeRequest: StandardChangeRequest = {
  crId: 37,
  wbsNum: exampleWbsWorkPackage1,
  submitter: exampleAdminUser,
  dateSubmitted: new Date('02/25/21'),
  type: ChangeRequestType.DesignIssue,
  dateReviewed: new Date('03/01/21'),
  reviewer: exampleAppAdminUser,
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
  crId: 69,
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
  crId: 93,
  wbsNum: exampleWbsWorkPackage1,
  submitter: exampleAdminUser,
  dateSubmitted: new Date('02/25/21'),
  type: ChangeRequestType.StageGate,
  leftoverBudget: 26,
  confirmDone: true
};

export const exampleStandardImplementedChangeRequest: StandardChangeRequest = {
  crId: 37,
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
  timelineImpact: 2,
  implementedChanges: [
    {
      changeId: 1,
      changeRequestId: 37,
      wbsNum: {
        car: 1,
        project: 23,
        workPackage: 3
      },
      implementer: {
        userId: 22,
        firstName: 'Joe',
        lastName: 'Schmoe',
        googleAuthId: 'testID',
        email: 'j.schmoe@northeastern.edu',
        emailId: null,
        role: 'LEADERSHIP'
      },
      detail: 'Adjust description'
    },
    {
      changeId: 1,
      changeRequestId: 37,
      wbsNum: {
        car: 1,
        project: 23,
        workPackage: 4
      },
      implementer: {
        userId: 22,
        firstName: 'Joe',
        lastName: 'Schmoe',
        googleAuthId: 'testID',
        email: 'j.schmoe@northeastern.edu',
        emailId: null,
        role: 'LEADERSHIP'
      },
      detail: 'Increase budget to 200'
    },
    {
      changeId: 1,
      changeRequestId: 37,
      wbsNum: {
        car: 1,
        project: 23,
        workPackage: 5
      },
      implementer: {
        userId: 22,
        firstName: 'Joe',
        lastName: 'Schmoe',
        googleAuthId: 'testID',
        email: 'j.schmoe@northeastern.edu',
        emailId: null,
        role: 'LEADERSHIP'
      },
      detail: 'Add 3 weeks'
    }
  ]
};

export const exampleAllChangeRequests: ChangeRequest[] = [
  exampleStandardChangeRequest,
  exampleActivationChangeRequest,
  exampleStageGateChangeRequest
];
