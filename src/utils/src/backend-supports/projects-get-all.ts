/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from '../types/project-types';
import { WbsElementStatus } from '../types/project-types';
import { TimelineStatus } from '../types/work-package-types';

const calculateEndDate = (start: Date, weeks: number) => {
  const end = new Date(start);
  end.setDate(start.getDate() + weeks * 7);
  return end;
};

const calculateDuration = (startDuration: Pick<WorkPackage, 'startDate' | 'duration'>[]) => {
  if (startDuration.length < 1) {
    return 0;
  }

  const endDates = startDuration.map((elt) => {
    return calculateEndDate(elt.startDate, elt.duration);
  });

  const earliestStartDate = startDuration.reduce(
    (min, cur) => (cur.startDate < min ? cur.startDate : min),
    startDuration[0].startDate
  );

  const latestEndDate = endDates.reduce((max, cur) => (cur > max ? cur : max), endDates[0]);

  const durationInDays =
    (latestEndDate.getTime() - earliestStartDate.getTime()) / (60 * 60 * 24 * 1000);
  const duration = Math.round(durationInDays / 7);

  return duration;
};

const calculatePercentExpectedProgress = (start: Date, weeks: number, status: String) => {
  if (status === WbsElementStatus.Inactive) {
    return 0;
  } else if (status === WbsElementStatus.Complete) {
    return 100;
  } else {
    const currentDate = new Date();
    const elapsedTime = currentDate.getTime() - start.getTime();
    const elapsedDays = elapsedTime / (1000 * 60 * 60 * 24);
    const percentProgress = (elapsedDays * 100) / (weeks * 7);
    return Math.min(Math.round(percentProgress), 100);
  }
};

/**
 * Calculates a status of how current progress compares to expected progress.
 *
 * @param progress The reported progress, as a percentage.
 * @param expectedProgress The expected progress, as a percentage.
 * @returns The status of the progress compared to expectation.
 */
const calculateTimelineStatus = (progress: number, expectedProgress: number): TimelineStatus => {
  const delta = progress - expectedProgress;
  if (delta > 25) {
    return TimelineStatus.Ahead;
  } else if (delta >= 0) {
    return TimelineStatus.OnTrack;
  } else if (delta >= -25) {
    return TimelineStatus.Behind;
  } else {
    return TimelineStatus.VeryBehind;
  }
};

export {
  calculateDuration,
  calculateEndDate,
  calculatePercentExpectedProgress,
  calculateTimelineStatus
};
