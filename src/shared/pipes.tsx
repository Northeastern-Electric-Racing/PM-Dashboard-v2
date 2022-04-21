/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { User } from '@prisma/client';
import { WbsElementStatus, WbsNumber } from 'utils';
import { Badge } from 'react-bootstrap';

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
 * Return a given date as a string in the local en-US format,
 * with single digit numbers starting with a zero.
 */
export const datePipe = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  });
};

// returns a given number as a string with a percent sign
export const percentPipe = (percent: number): string => {
  return `${percent}%`;
};

/**
 * Returns a colored chip in the form of a bootstrap pill badge.
 * @param {WbsElementStatus} status
 * @returns {JSX.Element}
 */
export const wbsStatusPipe = (status: WbsElementStatus): JSX.Element => {
  let color: string;
  let text: string;
  switch (status) {
    case WbsElementStatus.Active: {
      color = 'primary';
      text = 'Active';
      break;
    }
    case WbsElementStatus.Inactive: {
      color = 'secondary';
      text = 'Inactive';
      break;
    }
    default: {
      color = 'success';
      text = 'Complete';
      break;
    }
  }
  return (
    <Badge pill variant={color}>
      {text}
    </Badge>
  );
};
