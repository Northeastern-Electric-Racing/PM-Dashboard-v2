/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { apiRoutes, WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { useApiRequest } from './api-request';

/**
 * Transforms a work package to ensure deep field transformation of date objects.
 *
 * @param workPackage Incoming work package object supplied by the HTTP response.
 * @returns Properly transformed work package object.
 */
const workPackageTransformer = (workPackage: WorkPackage) => {
  return {
    ...workPackage,
    dateCreated: new Date(workPackage.dateCreated),
    startDate: new Date(workPackage.startDate),
    descriptionBullets: workPackage.descriptionBullets.map((bullet) => {
      return {
        ...bullet,
        dateAdded: new Date(bullet.dateAdded),
        dateDeleted: bullet.dateDeleted ? new Date(bullet.dateDeleted) : bullet.dateDeleted
      };
    })
  };
};

/**
 * Custom React Hook to supply the API response containing all work packages.
 *
 * @returns All work packages, via useApiRequest Hook pattern.
 */
export const useAllWorkPackages = () => {
  return useApiRequest<WorkPackage[]>(
    { method: 'GET', url: apiRoutes.WORK_PACKAGES },
    (response: WorkPackage[]) => response.map(workPackageTransformer)
  );
};

/**
 * Custom React Hook to supply the API response containing a single work package.
 *
 * @param wbsNum Work Package WBS number of the requested work package.
 * @returns The requested work package, via useApiRequest Hook pattern.
 */
export const useSingleWorkPackage = (wbsNum: WbsNumber) => {
  return useApiRequest<WorkPackage>(
    { method: 'GET', url: `${apiRoutes.WORK_PACKAGES}/${wbsPipe(wbsNum)}` },
    workPackageTransformer
  );
};
