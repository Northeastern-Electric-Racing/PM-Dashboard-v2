/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { HandlerCallback, HandlerContext, HandlerEvent } from '@netlify/functions';
import { WbsNumber, Project, WbsElementStatus, WorkPackage } from './types/project-types';
import {
  ChangeRequest,
  StandardChangeRequest,
  StageGateChangeRequest,
  ActivationChangeRequest,
  ChangeRequestReason,
  ChangeRequestType
} from './types/change-request-types';
import { User, Role } from './types/user-types';
import { ApiRoute } from './types/api-utils-types';
import { API_URL } from './api-routes';

/**
 * A variety of dummy data for use in performing various different tests, mocking components, or serving from the API.
 */

/********************** Users **********************/

export const exampleAppAdminUser: User = {
  id: 1,
  firstName: 'Thomas',
  lastName: 'Emrax',
  emailId: 'emrax.t',
  firstLogin: new Date('02/01/21'),
  lastLogin: new Date('03/04/21'),
  role: Role.AppAdmin
};

export const exampleAdminUser: User = {
  id: 2,
  firstName: 'Joe',
  lastName: 'Shmoe',
  emailId: 'shmoe.j',
  firstLogin: new Date('02/10/21'),
  lastLogin: new Date('02/25/21'),
  role: Role.Admin
};

export const exampleLeadershipUser: User = {
  id: 3,
  firstName: 'Joe',
  lastName: 'Blow',
  emailId: 'blow.j',
  firstLogin: new Date('02/25/21'),
  lastLogin: new Date('02/28/21'),
  role: Role.Leadership
};

export const exampleProjectLeadUser: User = {
  id: 4,
  firstName: 'Amy',
  lastName: 'Smith',
  emailId: 'smith.a',
  firstLogin: new Date('02/19/21'),
  lastLogin: new Date('03/12/21'),
  role: Role.ProjectLead
};

export const exampleProjectManagerUser: User = {
  id: 5,
  firstName: 'Rachel',
  lastName: 'Barmatha',
  emailId: 'barmatha.r',
  firstLogin: new Date('02/16/21'),
  lastLogin: new Date('02/19/21'),
  role: Role.ProjectManager
};

export const exampleMemberUser: User = {
  id: 6,
  firstName: 'Emily',
  lastName: 'Bendara',
  emailId: 'bendara.e',
  firstLogin: new Date('02/28/21'),
  lastLogin: new Date('03/03/21'),
  role: Role.Member
};

export const exampleGuestUser: User = {
  id: 7,
  firstName: 'Jackson',
  lastName: 'James',
  emailId: 'james.j',
  firstLogin: new Date('03/06/21'),
  lastLogin: new Date('03/06/21'),
  role: Role.Guest
};

export const exampleAllUsers: User[] = [
  exampleAppAdminUser,
  exampleAdminUser,
  exampleLeadershipUser,
  exampleProjectLeadUser,
  exampleProjectManagerUser,
  exampleMemberUser,
  exampleGuestUser
];

/*************** Work Breakdown Structure Numbers ***************/

export const exampleWbsWorkPackage1: WbsNumber = {
  car: 1,
  project: 1,
  workPackage: 1
};

export const exampleWbsWorkPackage2: WbsNumber = {
  car: 2,
  project: 7,
  workPackage: 3
};

export const exampleWbsProject1: WbsNumber = {
  car: 1,
  project: 12,
  workPackage: 0
};

export const exampleWbsProject2: WbsNumber = {
  car: 2,
  project: 5,
  workPackage: 0
};

export const exampleAllWbsNums: WbsNumber[] = [
  exampleWbsWorkPackage1,
  exampleWbsWorkPackage2,
  exampleWbsProject1,
  exampleWbsProject2
];

/********************** Work Packages **********************/

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
  rules: ['EV3.5.2'],
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
  rules: ['T12.3.2', 'T8.2.6'],
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
  rules: ['EV1.4.7', 'EV6.3.10'],
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

/********************** Projects **********************/

export const exampleProject1: Project = {
  id: 4,
  wbsNum: { car: 1, project: 1, workPackage: 0 },
  dateCreated: new Date('08/01/20'),
  name: 'Impact Attenuator',
  status: WbsElementStatus.Active,
  projectLead: exampleProjectLeadUser,
  projectManager: exampleLeadershipUser,
  gDriveLink: 'https://youtu.be/dQw4w9WgXcQ',
  taskListLink: 'https://youtu.be/dQw4w9WgXcQ',
  slideDeckLink: 'https://youtu.be/dQw4w9WgXcQ',
  bomLink: 'https://youtu.be/dQw4w9WgXcQ',
  workPackages: [exampleWorkPackage1, exampleWorkPackage2]
};

export const exampleProject2: Project = {
  id: 5,
  wbsNum: { car: 1, project: 2, workPackage: 0 },
  dateCreated: new Date('08/02/20'),
  name: 'Bodywork',
  status: WbsElementStatus.Inactive,
  projectLead: exampleProjectLeadUser,
  projectManager: exampleProjectManagerUser,
  gDriveLink: 'https://youtu.be/dQw4w9WgXcQ',
  taskListLink: 'https://youtu.be/dQw4w9WgXcQ',
  slideDeckLink: 'https://youtu.be/dQw4w9WgXcQ',
  bomLink: 'https://youtu.be/dQw4w9WgXcQ',
  workPackages: []
};

export const exampleProject3: Project = {
  id: 6,
  wbsNum: exampleWbsProject1,
  dateCreated: new Date('08/04/20'),
  name: 'Battery Box',
  status: WbsElementStatus.Active,
  projectLead: exampleLeadershipUser,
  projectManager: exampleProjectManagerUser,
  gDriveLink: 'https://youtu.be/dQw4w9WgXcQ',
  taskListLink: 'https://youtu.be/dQw4w9WgXcQ',
  slideDeckLink: 'https://youtu.be/dQw4w9WgXcQ',
  bomLink: 'https://youtu.be/dQw4w9WgXcQ',
  workPackages: [exampleWorkPackage1]
};

export const exampleProject4: Project = {
  id: 7,
  wbsNum: exampleWbsProject2,
  dateCreated: new Date('11/07/20'),
  name: 'Motor Controller Integration',
  status: WbsElementStatus.Inactive,
  projectLead: exampleLeadershipUser,
  projectManager: exampleAdminUser,
  gDriveLink: 'https://youtu.be/dQw4w9WgXcQ',
  taskListLink: 'https://youtu.be/dQw4w9WgXcQ',
  slideDeckLink: 'https://youtu.be/dQw4w9WgXcQ',
  bomLink: 'https://youtu.be/dQw4w9WgXcQ',
  workPackages: [exampleWorkPackage2]
};

export const exampleProject5: Project = {
  id: 8,
  wbsNum: { car: 2, project: 7, workPackage: 0 },
  dateCreated: new Date('08/03/20'),
  name: 'Wiring Harness',
  status: WbsElementStatus.Complete,
  projectLead: exampleProjectLeadUser,
  projectManager: exampleProjectManagerUser,
  gDriveLink: 'https://youtu.be/dQw4w9WgXcQ',
  taskListLink: 'https://youtu.be/dQw4w9WgXcQ',
  slideDeckLink: 'https://youtu.be/dQw4w9WgXcQ',
  bomLink: 'https://youtu.be/dQw4w9WgXcQ',
  workPackages: [exampleWorkPackage3]
};

export const exampleAllProjects: Project[] = [
  exampleProject1,
  exampleProject2,
  exampleProject3,
  exampleProject4,
  exampleProject5
];

/********************** Change Requests **********************/

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

/********************** API Util Dummy Data **********************/

export const exampleApiRoutes: ApiRoute[] = [
  {
    path: `${API_URL}/projects/one`,
    httpMethod: 'GET',
    func: () => {
      return { statusCode: 200, body: '5' };
    }
  },
  {
    path: `${API_URL}/projects/one`,
    httpMethod: 'POST',
    func: () => {
      return { statusCode: 200, body: '6' };
    }
  },
  {
    path: `${API_URL}/projects/two`,
    httpMethod: 'GET',
    func: () => {
      return { statusCode: 200, body: '7' };
    }
  },
  {
    path: `${API_URL}/projects/three`,
    httpMethod: 'GET',
    func: () => {
      return { statusCode: 200, body: '8' };
    }
  }
];

export const mockContext: HandlerContext = {
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: '',
  awsRequestId: '',
  logGroupName: '',
  logStreamName: '',
  callbackWaitsForEmptyEventLoop: false,
  getRemainingTimeInMillis: () => 0,
  done: () => 0,
  fail: () => 0,
  succeed: () => 0
};

export const mockCallback: HandlerCallback = (error, response) => {};

export const mockEvent: (path: string, httpMethod: string) => HandlerEvent = (path, httpMethod) => {
  return {
    rawUrl: '',
    rawQuery: '',
    path,
    httpMethod,
    headers: {},
    multiValueHeaders: {},
    queryStringParameters: {},
    multiValueQueryStringParameters: {},
    body: '',
    isBase64Encoded: false
  };
};
