/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMutation, useQuery } from 'react-query';
import { WorkPackage, WbsNumber, CreateWorkPackagePayload } from 'utils';
import { createSingleWorkPackage, getAllWorkPackages, getSingleWorkPackage } from './work-packages.api';

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

/**
 * Custom React Hook to create a new work package.
 * 
 */
export const useCreateSingleWorkPackage = () => {
  return useMutation<{ message: string }, Error, CreateWorkPackagePayload>(
    ['createWP'],
    async (wpPayload: CreateWorkPackagePayload) => {
      console.log('in hook');
      const { data } = await createSingleWorkPackage(wpPayload);
      console.log('got data');
      return data;
    }
  )
};
