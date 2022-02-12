/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { apiUrls } from '../shared/urls';
import { workPackageTransformer } from './transformers/work-packages.transformers';

/**
 * Fetch all work packages.
 */
export const getAllWorkPackages = () => {
  return axios.get<WorkPackage[]>(apiUrls.workPackages(), {
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
 * @param userId ID of the user
 * @param name Work package name
 * @param crId ID of change request that requires work package creation
 * @param projectId ID of project that the work package will fall under
 * @param startDate Date work package starts
 * @param duration How long (in weeks) the work package will take
 * @param wbsElementIds Dependencies of the work package
 * @param expectedActivities Expected activities of the work package
 * @param deliverables Deliverables of the work package
 */
export const createSingleWorkPackage = ( // use createwppayload schema instead
  userId: number,
  name: string,
  crId: number,
  projectId: number,
  startDate: Date,
  duration: number,
  wbsElementIds: number[], // this is dependencies
  expectedActivities: string[],
  deliverables: string[]
) => {
  console.log('in api');
  return axios.post<{ message: string }>(apiUrls.test(), {
    userId,
    name,
    crId,
    projectId,
    startDate,
    duration,
    wbsElementIds,
    expectedActivities,
    deliverables
  });
};
