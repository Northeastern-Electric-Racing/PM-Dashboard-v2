/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { User, WbsNumber } from 'utils';

/**
 * Pipes
 *
 * Data transformation functions designed to abstract view-based adjustments.
 * Pipe is a term / tool from Angular.
 */

export const linkPipe = (description: string, link: string): ReactElement => {
  return <a href={link}>{description}</a>;
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

export const fullNamePipe = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

export const booleanPipe = (bool: boolean): string => {
  return bool ? 'YES' : 'NO';
};

// Formats an array of objects into a string that is a list
export const listPipe = <T,>(array: T[], transform: (ele: T) => string): string => {
  try {
    return array.map(transform).join(', ');
  } catch (error) {
    console.error(error);
    return typeof array[0];
  }
};

// Formats the end date as a string
export const endDatePipe = (startDate: Date, durWeeks: number): string => {
  var endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + durWeeks * 7);
  return endDate.toLocaleDateString();
};

// Returns an empty string if a passed in string is empty, otherwise return the given string
export const emptyStringPipe = (str: string): string => {
  return str === undefined || str === null ? '' : str;
};

// Replace an empty string with an EM dash
export const emDashPipe = (str: string): string => {
  return str === undefined || str === null ? '—' : str;
};

// return a given data as a string in the local en-US format
export const datePipe = (date: Date): string => {
  var theDate = new Date(date);
  return theDate.toLocaleString('en-US');
};
