/*
 * This file is part of NER's FinishLine by NERand licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { CreateWorkPackagePayload, EditWorkPackagePayload, WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { apiUrls } from '../shared/urls';
import { workPackageTransformer } from './transformers/work-packages.transformers';

/**
 * Fetch all work packages.
 */
export const getAllWorkPackages = (queryParams?: { [field: string]: string }) => {
  return axios.get<WorkPackage[]>(apiUrls.workPackages(queryParams), {
    transformResponse: (data) => JSON.parse(data).map(workPackageTransformer)
  });
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

/**
 * Edit a work package.
 *
 * @param payload Object containing required key-value pairs for backend function to edit work package
 * @returns Promise that will resolve to either a success status code or a fail status code.
 */
export const editWorkPackage = (payload: EditWorkPackagePayload) => {
  return axios.post<{ message: string }>(apiUrls.workPackagesEdit(), {
    ...payload
  });
};
