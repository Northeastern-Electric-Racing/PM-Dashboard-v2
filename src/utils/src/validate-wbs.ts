/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber } from './types/project-types';

/**
 * Ensure the provided wbsNum is a valid Work Breakdown Structure Number
 *
 * @param wbsNum WBS number to validate
 */
export const validateWBS = (wbsNum: string): WbsNumber => {
  const errorMsg: string = 'WBS Invalid: ';
  if (wbsNum == null || wbsNum === undefined) {
    throw new Error(errorMsg + 'given WBS # is null');
  }
  if (wbsNum.match(/\./g) == null) {
    throw new Error(errorMsg + 'WBS #s include periods, none found');
  }
  const parseWbs: number[] = wbsNum.split('.').map((str) => {
    const num: number = parseInt(str);
    if (isNaN(num)) {
      throw new Error(errorMsg + 'Found characters where numbers were expected in WBS #');
    }
    return num;
  });
  if (parseWbs.length !== 3) {
    throw new Error(errorMsg + 'incorrect number of periods');
  }
  return {
    car: parseWbs[0],
    project: parseWbs[1],
    workPackage: parseWbs[2]
  };
};

/**
 * Is the provided wbsNum a project?
 *
 * @param wbsNum WBS number to check
 */
export const wbsIsProject = (wbsNum: string): boolean => {
  validateWBS(wbsNum);
  const splitWBS: string[] = wbsNum.split('.');
  return splitWBS[2] === '0';
};
