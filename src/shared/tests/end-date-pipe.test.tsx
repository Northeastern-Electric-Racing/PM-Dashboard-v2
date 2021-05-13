/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { endDatePipe } from '../pipes';
import {
  exampleWorkPackage1,
  exampleWorkPackage2,
  exampleWorkPackage3
} from '../../test-support/test-data/work-packages.stub';

describe('Formatting end date tests', () => {
  test('with dummy data', () => {
    expect(endDatePipe(exampleWorkPackage1.startDate, exampleWorkPackage1.duration)).toBe(
      '1/22/2021'
    );
    expect(endDatePipe(exampleWorkPackage2.startDate, exampleWorkPackage2.duration)).toBe(
      '2/26/2021'
    );
    expect(endDatePipe(exampleWorkPackage3.startDate, exampleWorkPackage3.duration)).toBe(
      '1/15/2021'
    );
  });

  test('with edge dates', () => {
    expect(endDatePipe(new Date('12/25/20'), 3)).toBe('1/15/2021');
    expect(endDatePipe(new Date('1/3/21'), 3)).toBe('1/24/2021');
    expect(endDatePipe(new Date('3/1/21'), 10)).toBe('5/10/2021');
  });
});
