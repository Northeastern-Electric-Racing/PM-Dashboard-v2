/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import {
  calculateEndDate,
  calculateDuration,
  calculatePercentExpectedProgress,
  calculateTimelineStatus
} from '../src/backend-supports/project-supports';
import { WbsElementStatus } from '../src/types/project-types';
import { TimelineStatus } from '../src/types/work-package-types';

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

describe('projectDurationBuilder', () => {
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
        { startDate: date, duration: 1 },
        { startDate: date, duration: 1 }
      ])
    ).toEqual(1);
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

describe('calculatePercentExpectedProgress', () => {
  it('works with INACTIVE status', () => {
    const startDate = new Date('01/01/21');
    expect(calculatePercentExpectedProgress(startDate, 3, WbsElementStatus.Inactive)).toEqual(0);
  });

  it('works with COMPLETE status', () => {
    const startDate = new Date('01/01/21');
    expect(calculatePercentExpectedProgress(startDate, 3, WbsElementStatus.Complete)).toEqual(100);
  });

  it('works with reasonable ACTIVE status', () => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    expect(calculatePercentExpectedProgress(weekAgo, 3, WbsElementStatus.Active)).toEqual(33);
  });

  it('works with overdue ACTIVE status', () => {
    const startDate = new Date('March 20, 2020');
    expect(calculatePercentExpectedProgress(startDate, 3, WbsElementStatus.Active)).toEqual(100);
  });
});

describe('calculateTimelineStatus', () => {
  it('works Ahead of schedule', () => {
    expect(calculateTimelineStatus(75, 30)).toEqual(TimelineStatus.Ahead);
  });

  it('works OnTrack', () => {
    expect(calculateTimelineStatus(55, 30)).toEqual(TimelineStatus.OnTrack);
  });

  it('works when progress is the same as expected progress', () => {
    expect(calculateTimelineStatus(50, 50)).toEqual(TimelineStatus.OnTrack);
  });

  it('works Behind schedule', () => {
    expect(calculateTimelineStatus(25, 30)).toEqual(TimelineStatus.Behind);
  });

  it('works VeryBehind schedule', () => {
    expect(calculateTimelineStatus(0, 100)).toEqual(TimelineStatus.VeryBehind);
  });
});
