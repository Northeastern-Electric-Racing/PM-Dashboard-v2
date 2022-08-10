/*
 * This file is part of NER's FinishLine by NERand licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { validateWBS, isProject } from '../src/validate-wbs';
import {
  exampleWbsProject1,
  exampleWbsProject2,
  exampleWbsWorkPackage1,
  exampleWbsWorkPackage2,
  exampleWbs1,
  exampleWbs2,
  exampleWbs3
} from '../../test-support/test-data/wbs-numbers.stub';
import { equalsWbsNumber } from '../lib';

describe('validate wbs numbers', () => {
  it('does not throw on valid WBS nums', () => {
    const validWbsNums: string[] = [
      '1.1.1',
      '1.1.0',
      '1.10.1',
      '1.10.10',
      '1.6.15',
      '2.1.1',
      '2.3.0',
      '2.54.1',
      '2.16.9',
      '2.2.36'
    ];
    validWbsNums.forEach((wbs) => expect(() => validateWBS(wbs)).not.toThrow());
  });

  it('throws if no periods', () => {
    expect(() => {
      validateWBS('11');
    }).toThrowError('WBS Invalid: WBS #s include periods, none found');
  });

  it('throws if only 1 period', () => {
    expect(() => {
      validateWBS('1.1');
    }).toThrowError('WBS Invalid: incorrect number of periods');
  });

  it('throws if greater than 2 periods', () => {
    const expectedError: string = 'WBS Invalid: incorrect number of periods';
    expect(() => validateWBS('1.1.1.')).toThrowError(expectedError);
    expect(() => validateWBS('1.1.1..')).toThrowError(expectedError);
    expect(() => validateWBS('1.1.1.1.1.1')).toThrowError(expectedError);
  });

  it('throws if wbs is less than 0', () => {
    const expectedError: string = 'WBS Invalid: WBS #s must be greater than or equal to 0';
    expect(() => validateWBS('-1.1.1')).toThrowError(expectedError);
  });
});

describe('check wbs numbers are projects', () => {
  it('detects project wbsNumbers', () => {
    expect(isProject(exampleWbsProject1)).toBeTruthy();
    expect(isProject(exampleWbsProject2)).toBeTruthy();
  });

  it('detects work package wbsNumbers', () => {
    expect(isProject(exampleWbsWorkPackage1)).toBeFalsy();
    expect(isProject(exampleWbsWorkPackage2)).toBeFalsy();
  });
});

describe('check wbs numbers are not equal', () => {
  it('wbsNumbers not equal when only car field is equal', () => {
    expect(equalsWbsNumber(exampleWbsWorkPackage1, exampleWbsProject1)).toBeFalsy();
  });
  it('wbsNumbers not equal when only project field is equal', () => {
    expect(equalsWbsNumber(exampleWbsWorkPackage2, exampleWbs2)).toBeFalsy();
  });
  it('wbsNumbers not equal when only workPackage field is equal', () => {
    expect(equalsWbsNumber(exampleWbsProject1, exampleWbsProject2)).toBeFalsy();
  });
  it('wbsNumbers not equal when none of the fields are equal', () => {
    expect(equalsWbsNumber(exampleWbsProject1, exampleWbsProject2)).toBeFalsy();
  });
  it('wbsNumbers not equal when only car and project field are equal', () => {
    expect(equalsWbsNumber(exampleWbs2, exampleWbs3)).toBeFalsy();
  });
  it('wbsNumbers not equal when only project and workPackage field are equal', () => {
    expect(equalsWbsNumber(exampleWbsWorkPackage2, exampleWbs3)).toBeFalsy();
  });
  it('wbsNumbers not equal when only car and workPackage field are equal', () => {
    expect(equalsWbsNumber(exampleWbsProject1, exampleWbs2)).toBeFalsy();
  });
  it('wbsNumbers not equal when only car and workPackage field are equal (order of args does not matter)', () => {
    expect(equalsWbsNumber(exampleWbs2, exampleWbsProject1)).toBeFalsy();
  });
});

describe('check wbs numbers are equal', () => {
  it('wbsNumbers equal when car, project, and workPackage field are equal', () => {
    expect(equalsWbsNumber(exampleWbsWorkPackage1, exampleWbs1)).toBeTruthy();
  });
  it('wbsNumbers equal when car, project, and workPackage field are equal (order of args does not matter)', () => {
    expect(equalsWbsNumber(exampleWbs1, exampleWbsWorkPackage1)).toBeTruthy();
  });
  it('wbsNumber equal to itself', () => {
    expect(equalsWbsNumber(exampleWbs1, exampleWbs1)).toBeTruthy();
  });
});
