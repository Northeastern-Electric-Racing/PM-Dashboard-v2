/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useQuery } from 'react-query';
import { WorkPackage, WbsNumber } from 'utils';
import { getAllWorkPackages, getSingleWorkPackage } from '../apis/work-packages.api';

/**
 * Custom React Hook to supply all work packages.
 */
export const useAllWorkPackages = () => {
  return useQuery<WorkPackage[], Error>('work package', async () => {
    const { data } = await getAllWorkPackages();
    return data;
  });
};

/**
 * Custom React Hook to supply a single work package.
 *
 * @param wbsNum WBS number of the requested work package.
 */
export const useSingleWorkPackage = (wbsNum: WbsNumber) => {
  return useQuery<WorkPackage, Error>(['work package', wbsNum], async () => {
    const { data } = await getSingleWorkPackage(wbsNum);
    return data;
  });
};
