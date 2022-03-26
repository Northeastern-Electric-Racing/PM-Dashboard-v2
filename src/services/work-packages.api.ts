/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { CreateWorkPackagePayload, WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { apiUrls } from '../shared/urls';
import { workPackageTransformer } from './transformers/work-packages.transformers';

/**
 * Fetch all work packages.
 */
export const getAllWorkPackages = (onSuccess?: (value: any) => void) => {
  const workPackages = axios.get<WorkPackage[]>(apiUrls.workPackages(), {
    transformResponse: (data) => JSON.parse(data).map(workPackageTransformer)
  });

  if (onSuccess) {
    workPackages.then((response) => {
      onSuccess!(response);
    });
  }

  return workPackages;
};

/**
 * Fetch a single work package.
 *
 * @param wbsNum Work Package WBS number of the requested work package.
 */
export const getSingleWorkPackage = (wbsNum: WbsNumber) => {
  return axios.get<WorkPackage>(apiUrls.workPackagesByWbsNum(wbsPipe(wbsNum)), {
    transformResponse: (data) => workPackageTransformer(JSON.parse(data))
  });
};

/**
 * Create a single work package.
 *
 * @param payload Payload containing all the necessary data to create a work package.
 */
export const createSingleWorkPackage = (payload: CreateWorkPackagePayload) => {
  return axios.post<{ message: string }>(apiUrls.workPackagesCreate(), {
    ...payload
  });
};
