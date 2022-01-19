/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

const calculateEndDate = (start: Date, weeks: number) => {
  const end = new Date(start);
  end.setDate(start.getDate() + weeks * 7);
  return end;
};

const projectDurationBuilder = (wps: any) => {
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

export { projectDurationBuilder, calculateEndDate };