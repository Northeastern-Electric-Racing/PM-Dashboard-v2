/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from "../types/project-types";

const calculateEndDate = (start: Date, weeks: number) => {
  const end = new Date(start);
  end.setDate(start.getDate() + weeks * 7);
  return end;
};

const calculateDuration = (startDuration : Pick<WorkPackage, "startDate" | "duration">[]) => {
  if (startDuration.length < 1) {
    return 0;
  }
  
  const endDates = startDuration.map((elt) => {    
    return calculateEndDate(elt.startDate, elt.duration);
  });

  const earliestStartDate = startDuration.reduce((min, cur) => 
    (cur.startDate < min ? cur.startDate : min), startDuration[0].startDate);

    const latestEndDate = endDates.reduce((max, cur) => (cur > max ? cur : max), endDates[0]);

  const durationInDays = (latestEndDate.getTime() - earliestStartDate.getTime()) / (60 * 60 * 24 * 1000);
  const duration = Math.round(durationInDays / 7);

  return duration;
}

export { calculateEndDate, calculateDuration };
