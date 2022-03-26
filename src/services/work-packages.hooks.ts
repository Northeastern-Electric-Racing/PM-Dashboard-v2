/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMutation, useQuery } from 'react-query';
import { WorkPackage, WbsNumber, CreateWorkPackagePayload } from 'utils';
import {
  createSingleWorkPackage,
  getAllWorkPackages,
  getSingleWorkPackage
} from './work-packages.api';

/**
 * Custom React Hook to supply all work packages.
 */
export const useAllWorkPackages = (onSuccess?: (value: any) => void) => {
  return useQuery<WorkPackage[], Error>('work package', async () => {
    if (onSuccess) {
      const { data } = await getAllWorkPackages(onSuccess);
      return data;
    }

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
 * @param wpPayload Payload containing all information needed to create a work package.
 */
export const useCreateSingleWorkPackage = () => {
  return useMutation<{ message: string }, Error, CreateWorkPackagePayload>(
    ['createWP'],
    async (wpPayload: CreateWorkPackagePayload) => {
      const { data } = await createSingleWorkPackage(wpPayload);
      return data;
    }
  );
};
