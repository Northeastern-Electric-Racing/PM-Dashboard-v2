/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber } from 'utils/src';

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

export const exampleWbs1: WbsNumber = {
  car: 1,
  project: 1,
  workPackage: 1
};

export const exampleWbs2: WbsNumber = {
  car: 1,
  project: 7,
  workPackage: 1
};

export const exampleWbs3: WbsNumber = {
  car: 1,
  project: 7,
  workPackage: 3
};

export const exampleAllWbsNums: WbsNumber[] = [
  exampleWbsWorkPackage1,
  exampleWbsWorkPackage2,
  exampleWbsProject1,
  exampleWbsProject2,
  exampleWbs1,
  exampleWbs2,
  exampleWbs3
];
