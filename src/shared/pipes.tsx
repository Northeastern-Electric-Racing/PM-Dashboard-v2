/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { User } from '@prisma/client';
import { WbsNumber } from 'utils';

/**
 * Pipes:
 *
 * Data transformation functions designed to abstract view-based adjustments.
 * Pipe is a term / tool from Angular.
 */

export const linkPipe = (description: string, link: string): ReactElement => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {description}
    </a>
  );
};

export const weeksPipe = (weeks: number): string => {
  return `${weeks} week${weeks === 1 ? '' : 's'}`;
};

export const dollarsPipe = (dollars: number): string => {
  return `$${dollars}`;
};

export const wbsPipe = (wbsNum: WbsNumber): string => {
  return `${wbsNum.car}.${wbsNum.project}.${wbsNum.workPackage}`;
};

export const fullNamePipe = (user?: User): string => {
  return user ? `${user.firstName} ${user.lastName}` : emDashPipe('');
};

export const booleanPipe = (bool: boolean): string => {
  return bool ? 'YES' : 'NO';
};

// Formats an array of objects into a string that is a list.
export const listPipe = <T,>(array: T[], transform: (ele: T) => string): string => {
  return array.map(transform).join(', ');
};

// Formats the end date as a string.
export const endDatePipe = (startDate: Date, durWeeks: number): string => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + durWeeks * 7);
  return datePipe(endDate);
};

// Replaces an empty string with an EM dash.
export const emDashPipe = (str: string): string => {
  return str.trim() === '' ? '—' : str;
};

/**
 * Return a given data as a string in the local en-US format,
 * with single digit numbers starting with a zero.
 */
export const datePipe = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
