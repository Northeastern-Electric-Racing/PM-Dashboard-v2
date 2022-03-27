/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { calculateEndDate, calculateDuration } from '../src/backend-supports/projects-get-all';

describe('calculateEndDate', () => {
  it('works with 0 weeks', () => {
    const date = new Date('January 15, 2020');
    expect(calculateEndDate(date, 0)).toEqual(date);
  });

  it('works with 1 weeks', () => {
    expect(calculateEndDate(new Date('January 15, 2020'), 1)).toEqual(new Date('January 22, 2020'));
  });

  it('works with 3 weeks', () => {
    expect(calculateEndDate(new Date('January 01, 2020'), 3)).toEqual(new Date('January 22, 2020'));
  });

  it('works across months 3 weeks', () => {
    expect(calculateEndDate(new Date('March 20, 2020'), 3)).toEqual(new Date('April 10, 2020'));
  });
});

describe('calculateDuration', () => {
  it('works with 0 work packages', () => {
    expect(calculateDuration([])).toEqual(0);
  });

  it('works with 1 work package', () => {
    const date = new Date('January 15, 2020');
    expect(calculateDuration([{ startDate: date, duration: 1 }])).toEqual(1);
  });

  it('works with 2 work packages, same end date', () => {
    const date = new Date('January 15, 2020');
    expect(
      calculateDuration([
        { startDate: date, duration: 3 },
        { startDate: date, duration: 5 }
      ])
    ).toEqual(5);
  });

  it('works with 2 work packages, full offset', () => {
    const date1 = new Date('January 15, 2020');
    const date2 = new Date('January 22, 2020');
    expect(
      calculateDuration([
        { startDate: date1, duration: 1 },
        { startDate: date2, duration: 2 }
      ])
    ).toEqual(3);
  });

  it('works with 3 work packages, partial offset', () => {
    const date1 = new Date('January 15, 2020');
    const date2 = new Date('January 22, 2020');
    expect(
      calculateDuration([
        { startDate: date1, duration: 2 },
        { startDate: date2, duration: 5 },
        { startDate: date2, duration: 2 }
      ])
    ).toEqual(6);
  });
});
