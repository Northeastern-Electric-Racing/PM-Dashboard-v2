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

export const linkPipe: Function = (description: string, link: string): ReactElement => {
  return <a href={link}>{description}</a>;
};

export const weeksPipe: Function = (weeks: number): string => {
  return `${weeks} weeks`;
};

export const dollarsPipe: Function = (dollars: number): string => {
  return `$${dollars}`;
};

export const wbsPipe: Function = (wbsNum: WbsNumber): string => {
  return `${wbsNum.area}.${wbsNum.project}.${wbsNum.workPackage}`;
};

export const fullNamePipe: Function = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};
