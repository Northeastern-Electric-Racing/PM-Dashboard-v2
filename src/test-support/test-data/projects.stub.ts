/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import { WbsElementStatus } from 'utils/src';
import {
  exampleAdminUser,
  exampleLeadershipUser,
  exampleProjectLeadUser,
  exampleProjectManagerUser
} from './users.stub';
import { exampleWbsProject1, exampleWbsProject2 } from './wbs-numbers.stub';
import {
  exampleWorkPackage1,
  exampleWorkPackage2,
  exampleWorkPackage3
} from './work-packages.stub';

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
  rules: ['T12.3.2', 'T8.2.6'],
  goals: [
    {
      id: 15,
      detail: 'Decrease size by 90% from 247 cubic inches to 24.7 cubic inches',
      dateAdded: new Date('05/26/21')
    }
  ],
  otherConstraints: [
    {
      id: 10,
      detail: 'Cannot go further towards the rear of the car than the front roll hoop',
      dateAdded: new Date('05/27/21')
    }
  ],
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
  rules: ['EV1.4.7', 'EV6.3.10'],
  goals: [
    {
      id: 16,
      detail: 'Decrease weight by 90% from 4.8 pounds to 0.48 pounds',
      dateAdded: new Date('06/10/21')
    }
  ],
  otherConstraints: [
    { id: 11, detail: 'Compatible with a side-pod chassis design', dateAdded: new Date('06/12/21') }
  ],
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
  rules: ['EV3.5.2'],
  goals: [
    {
      id: 17,
      detail: 'Decrease weight by 60% from 100 pounds to 40 pounds',
      dateAdded: new Date('08/02/21')
    }
  ],
  otherConstraints: [
    {
      id: 12,
      detail: 'Maximum power consumption of 25 watts from the low voltage system',
      dateAdded: new Date('08/05/21')
    }
  ],
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
  rules: ['EV3.5.2'],
  goals: [
    {
      id: 18,
      detail: 'Power consumption stays under 10 watts from the low voltage system',
      dateAdded: new Date('05/11/21')
    }
  ],
  otherConstraints: [
    { id: 13, detail: 'Must be compatible with chain drive', dateAdded: new Date('05/12/21') }
  ],
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
  rules: ['EV3.5.2'],
  goals: [
    {
      id: 19,
      detail: 'Decrease installed component costs by 63% from $2,700 to $1000',
      dateAdded: new Date('02/05/21')
    }
  ],
  otherConstraints: [
    { id: 14, detail: 'Utilizes 8020 frame construction', dateAdded: new Date('02/16/21') }
  ],
  workPackages: [exampleWorkPackage3]
};

export const exampleAllProjects: Project[] = [
  exampleProject1,
  exampleProject2,
  exampleProject3,
  exampleProject4,
  exampleProject5
];
