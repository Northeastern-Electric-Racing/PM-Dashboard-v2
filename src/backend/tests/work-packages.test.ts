/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage, exampleAllWorkPackages } from 'utils';

describe('all example work packages', () => {
  it('contains 3 work packages', () => {
    expect(exampleAllWorkPackages.length).toBe(3);
  });

  it('has all required fields', () => {
    exampleAllWorkPackages.forEach((wps: WorkPackage) => {
      expect(wps.hasOwnProperty('wbsNum')).toBeTruthy();
      expect(wps.hasOwnProperty('name')).toBeTruthy();
      expect(wps.hasOwnProperty('projectLead')).toBeTruthy();
      expect(wps.hasOwnProperty('projectManager')).toBeTruthy();
      expect(0).toBe(0);
    });
  });

  it('has proper work package wbsNums', () => {
    exampleAllWorkPackages.forEach((wps: WorkPackage) => {
      const workpackages: WorkPackage = wps;
      expect(workpackages.wbsNum).toBeTruthy();
    });
  });
});
