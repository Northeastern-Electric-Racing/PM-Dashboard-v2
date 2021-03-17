/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { validateWBS, wbsIsProject } from '../src/validate-wbs';

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

  it('throws if functional area not 1 or 2', () => {
    const expectedError: string = 'WBS Invalid: functional areas are only 1 or 2, found ';
    expect(() => validateWBS('3.1.1')).toThrowError(expectedError + '3');
    expect(() => validateWBS('X.1.1')).toThrowError(expectedError + 'X');
    expect(() => validateWBS('<.1.1')).toThrowError(expectedError + '<');
  });
});

describe('check wbs numbers are projects', () => {
  it('does not throw on valid WBS nums', () => {
    const validWbsNums: string[] = ['1.1.1', '1.10.10', '1.6.15', '2.54.1', '2.2.36'];
    validWbsNums.forEach((wbs) => expect(() => wbsIsProject(wbs)).not.toThrow());
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

  it('throws if functional area not 1 or 2', () => {
    const expectedError: string = 'WBS Invalid: functional areas are only 1 or 2, found ';
    expect(() => validateWBS('3.1.1')).toThrowError(expectedError + '3');
    expect(() => validateWBS('X.1.1')).toThrowError(expectedError + 'X');
    expect(() => validateWBS('<.1.1')).toThrowError(expectedError + '<');
  });
});
