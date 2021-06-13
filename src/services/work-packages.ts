/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';
import { WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { apiUrls } from '../shared/urls';
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
  const config: AxiosRequestConfig = useMemo(
    () => ({ method: 'GET', url: apiUrls.workPackages() }),
    []
  );
  const transformer = (response: WorkPackage[]) => response.map(workPackageTransformer);
  return useApiRequest<WorkPackage[]>(config, transformer);
};

/**
 * Custom React Hook to supply the API response containing a single work package.
 *
 * @param wbsNum Work Package WBS number of the requested work package.
 * @returns The requested work package, via useApiRequest Hook pattern.
 */
export const useSingleWorkPackage = (wbsNum: WbsNumber) => {
  const config: AxiosRequestConfig = useMemo(
    () => ({ method: 'GET', url: apiUrls.workPackagesByWbsNum(wbsPipe(wbsNum)) }),
    [wbsNum]
  );
  return useApiRequest<WorkPackage>(config, workPackageTransformer);
};
