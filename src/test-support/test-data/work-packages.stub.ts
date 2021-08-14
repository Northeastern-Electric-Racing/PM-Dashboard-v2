/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsElementStatus, WorkPackage } from 'utils';
import {
  exampleAdminUser,
  exampleAppAdminUser,
  exampleGuestUser,
  exampleLeadershipUser,
  exampleProjectLeadUser,
  exampleProjectManagerUser
} from './users.stub';
import {
  exampleWbsProject1,
  exampleWbsProject2,
  exampleWbsWorkPackage1,
  exampleWbsWorkPackage2
} from './wbs-numbers.stub';

export const exampleWorkPackage1: WorkPackage = {
  id: 1,
  wbsNum: exampleWbsWorkPackage1,
  dateCreated: new Date('11/15/20'),
  name: 'Bodywork Concept of Design',
  status: WbsElementStatus.Active,
  projectLead: exampleAdminUser,
  projectManager: exampleLeadershipUser,
  order: 1,
  progress: 25,
  startDate: new Date('01/01/21'),
  duration: 3,
  budget: 0,
  dependencies: [],
  deliverable: 'High-level anaylsis of options and direction to go in for the project',
  descriptionBullets: [
    {
      id: 1,
      detail:
        'Assess the bodywork captsone and determine what can be learned from their deliverables',
      dateAdded: new Date('11/15/20')
    },
    {
      id: 2,
      detail:
        'Compare various material, design, segmentation, and mounting choices available and propose the best combination',
      dateAdded: new Date('11/15/20')
    }
  ],

  changes: [
    {
      id: 1,
      crId: 33,
      wbsNum: exampleWbsWorkPackage2,
      implementer: exampleGuestUser,
      detail: 'Increased funding by $500.'
    }
  ]
};

export const exampleWorkPackage2: WorkPackage = {
  id: 2,
  wbsNum: {
    car: 1,
    project: 1,
    workPackage: 2
  },
  dateCreated: new Date('10/02/20'),
  name: 'Adhesive Shear Strength Test',
  status: WbsElementStatus.Inactive,
  projectLead: exampleProjectLeadUser,
  projectManager: exampleLeadershipUser,
  order: 2,
  progress: 0,
  startDate: new Date('01/22/21'),
  duration: 5,
  budget: 75,
  dependencies: [exampleWbsWorkPackage1],
  deliverable:
    'Lab report with full data on the shear strength of adhesives under test including a summary and conclusion of which adhesive is best',
  descriptionBullets: [
    {
      id: 3,
      detail:
        'Build a test procedure for destructively measuring the shear strength of various adhesives interacting with foam and steel plates',
      dateAdded: new Date('10/02/20')
    },
    {
      id: 4,
      detail: 'Design and manufacture test fixtures to perform destructive testing',
      dateAdded: new Date('10/02/20')
    },
    {
      id: 5,
      detail: 'Write a report to summarize findings',
      dateAdded: new Date('10/05/20')
    }
  ],

  changes: [
    {
      id: 2,
      crId: 1,
      wbsNum: exampleWbsWorkPackage2,
      implementer: exampleAppAdminUser,
      detail: 'Decreased duration from 10 weeks to 7 weeks.'
    },

    {
      id: 13,
      crId: 54,
      wbsNum: exampleWbsWorkPackage1,
      implementer: exampleProjectLeadUser,
      detail: 'Added "jet fuel burns hot" bullet.'
    }
  ]
};

export const exampleWorkPackage3: WorkPackage = {
  id: 3,
  wbsNum: exampleWbsWorkPackage2,
  dateCreated: new Date('09/27/20'),
  name: 'Manufacture Wiring Harness',
  status: WbsElementStatus.Complete,
  projectLead: exampleLeadershipUser,
  projectManager: exampleProjectManagerUser,
  order: 3,
  progress: 100,
  startDate: new Date('01/01/21'),
  duration: 2,
  budget: 124,
  dependencies: [exampleWbsProject1, exampleWbsProject2],
  deliverable: 'Completed wiring harness for the entire car',
  descriptionBullets: [
    {
      id: 6,
      detail: 'Manufacutre section A of the wiring harness',
      dateAdded: new Date('09/27/20')
    },
    {
      id: 7,
      detail: 'Determine which portion of the wiring harness is important',
      dateAdded: new Date('09/27/20'),
      dateDeleted: new Date('10/16/20')
    },
    {
      id: 8,
      detail: 'Solder wiring segments together and heat shrink properly',
      dateAdded: new Date('09/30/20')
    },
    {
      id: 9,
      detail: 'Cut all wires to length',
      dateAdded: new Date('11/6/20')
    }
  ],
  changes: [
    {
      id: 7,
      crId: 14,
      wbsNum: exampleWbsWorkPackage1,
      implementer: exampleAdminUser,
      detail: 'Increased budget from $10 to $200.'
    }
  ]
};

export const exampleAllWorkPackages: WorkPackage[] = [
  exampleWorkPackage1,
  exampleWorkPackage2,
  exampleWorkPackage3
];
