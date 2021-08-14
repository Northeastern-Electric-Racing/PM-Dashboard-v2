/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WBS_Element_Status } from '@prisma/client';

const dbSeedProjectLinks: any = {
  googleDriveFolderLink: 'https://youtu.be/dQw4w9WgXcQ',
  taskListLink: 'https://youtu.be/dQw4w9WgXcQ',
  slideDeckLink: 'https://youtu.be/dQw4w9WgXcQ',
  bomLink: 'https://youtu.be/dQw4w9WgXcQ',
  rules: ['EV3.5.2', 'T12.3.2', 'T8.2.6', 'EV1.4.7', 'EV6.3.10']
};

const dbSeedProject1: any = {
  wbsElementFields: {
    carNumber: 1,
    projectNumber: 1,
    workPackageNumber: 0,
    dateCreated: new Date('08/01/20'),
    name: 'Impact Attenuator',
    status: WBS_Element_Status.ACTIVE,
    projectLeadId: 4,
    projectManagerId: 5
  },
  projectFields: dbSeedProjectLinks
};

const dbSeedProject2: any = {
  wbsElementFields: {
    carNumber: 1,
    projectNumber: 2,
    workPackageNumber: 0,
    name: 'Bodywork',
    status: WBS_Element_Status.INACTIVE,
    projectLeadId: 3,
    projectManagerId: 4
  },
  projectFields: dbSeedProjectLinks
};

const dbSeedProject3: any = {
  wbsElementFields: {
    carNumber: 1,
    projectNumber: 12,
    workPackageNumber: 0,
    dateCreated: new Date('08/04/20'),
    name: 'Battery Box',
    status: WBS_Element_Status.ACTIVE,
    projectLeadId: 2,
    projectManagerId: 3
  },
  projectFields: dbSeedProjectLinks
};

const dbSeedProject4: any = {
  wbsElementFields: {
    carNumber: 1,
    projectNumber: 23,
    workPackageNumber: 0,
    dateCreated: new Date('11/07/20'),
    name: 'Motor Controller Integration',
    status: WBS_Element_Status.INACTIVE,
    projectLeadId: 4,
    projectManagerId: 5
  },
  projectFields: dbSeedProjectLinks
};

const dbSeedProject5: any = {
  wbsElementFields: {
    carNumber: 1,
    projectNumber: 25,
    workPackageNumber: 0,
    dateCreated: new Date('08/03/20'),
    name: 'Wiring Harness',
    status: WBS_Element_Status.COMPLETE,
    projectLeadId: 4,
    projectManagerId: 5
  },
  projectFields: dbSeedProjectLinks
};

export const dbSeedAllProjects: any[] = [
  dbSeedProject1,
  dbSeedProject2,
  dbSeedProject3,
  dbSeedProject4,
  dbSeedProject5
];
