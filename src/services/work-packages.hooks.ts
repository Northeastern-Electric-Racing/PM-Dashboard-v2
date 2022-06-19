/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMutation, useQuery } from 'react-query';
import {
  WorkPackage,
  WbsNumber,
  CreateWorkPackagePayload,
  EditWorkPackagePayload,
  WbsElementStatus,
  TimelineStatus
} from 'utils';
import {
  createSingleWorkPackage,
  editWorkPackage,
  getAllWorkPackages,
  getAllWorkPackagesUpcomingDeadlines,
  getSingleWorkPackage
} from './work-packages.api';

/**
 * Custom React Hook to supply all work packages.
 */
export const useAllWorkPackages = (status?: WbsElementStatus, timelineStatus?: TimelineStatus) => {
  return useQuery<WorkPackage[], Error>(['work packages'], async () => {
    const { data } = await getAllWorkPackages(status, timelineStatus);
    return data;
  });
};

/**
 * Custom React Hook to supply a single work package.
 *
 * @param wbsNum WBS number of the requested work package.
 */
export const useSingleWorkPackage = (wbsNum: WbsNumber) => {
  return useQuery<WorkPackage, Error>(['work packages', wbsNum], async () => {
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
    ['work packages', 'create'],
    async (wpPayload: CreateWorkPackagePayload) => {
      const { data } = await createSingleWorkPackage(wpPayload);
      return data;
    }
  );
};

/**
 * Custom React Hook to edit a work package.
 *
 * @returns React-query tility functions exposed by the useMutation hook
 */
export const useEditWorkPackage = () => {
  return useMutation<{ message: string }, Error, EditWorkPackagePayload>(
    ['work packages', 'edit'],
    async (wpPayload: EditWorkPackagePayload) => {
      const { data } = await editWorkPackage(wpPayload);
      return data;
    },
    {
      onError: (error) => {
        alert(error.message + " but it's probably invalid cr id"); // very scuffed, find a better way to surface errors on front end
      }
    }
  );
};

/**
 * Custom React Hook to supply all work packages with an upcoming deadline.
 */
export const useAllWorkPackagesUpcomingDeadlines = () => {
  return useQuery<WorkPackage[], Error>(['work packages', 'upcoming deadlines'], async () => {
    const { data } = await getAllWorkPackagesUpcomingDeadlines();
    return data;
  });
};
