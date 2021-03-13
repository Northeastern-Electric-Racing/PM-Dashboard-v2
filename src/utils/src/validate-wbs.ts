/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

/**
 * Ensure the provided wbsNum is a valid Work Breakdown Structure Number
 *
 * @param wbsNum WBS number to validate
 */
export const validateWBS: Function = (wbsNum: string): void => {
  const errorMsg: string = 'WBS Invalid: ';
  if (wbsNum == null || wbsNum === undefined) {
    throw new Error(errorMsg + 'given WBS # is null');
  }
  if (wbsNum.match(/\./g) == null) {
    throw new Error(errorMsg + 'WBS #s include periods, none found');
  }
  const wbsArr: string[] = wbsNum.split('.');
  if (wbsArr.length !== 3) {
    throw new Error(errorMsg + 'incorrect number of periods');
  }
  if (wbsArr[0] !== '1' && wbsArr[0] !== '2') {
    throw new Error(errorMsg + 'functional areas are only 1 or 2, found ' + wbsArr[0]);
  }
};

/**
 * Is the provided wbsNum a project?
 *
 * @param wbsNum WBS number to check
 */
export const wbsIsProject: Function = (wbsNum: string): boolean => {
  validateWBS(wbsNum);
  const splitWBS: string[] = wbsNum.split('.');
  return splitWBS[2] === '0';
};
