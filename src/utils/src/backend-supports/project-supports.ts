import{
  WorkPackage
}from 'utils';
/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

/**
 * This function calculates the end date.
 * @param start the start date
 * @param weeks number of weeks
 * @returns the start date after the weeks have passed
 */
const calculateEndDate = (start: Date, weeks: number) => {
  const end = new Date(start);
  end.setDate(start.getDate() + weeks * 7);
  return end;
};

/**
 * This symbol function calculates the duration 
 * @param wps an array of a npmproject schedule
 * @returns the duration of the project in weeks
 */
const calculateDuration = (wps: Array<WorkPackage>) => {
  if (wps.length === 0) return 0;
  if (wps.length === 1) return wps[0].duration;

  let firstStart = wps[0].startDate;
  let lastEnd = calculateEndDate(firstStart, wps[0].duration);

  for (const wp of wps) {
    if (wp.startDate < firstStart) firstStart = wp.startDate;
    const end = calculateEndDate(wp.startDate, wp.duration);
    if (end > lastEnd) lastEnd = end;
  }
  const durationMilliseconds = lastEnd.getTime() - firstStart.getTime();
  const durationWeeks = durationMilliseconds / (1000 * 60 * 60 * 24 * 7);
  return Math.round(durationWeeks);
};

export { calculateDuration, calculateEndDate };
