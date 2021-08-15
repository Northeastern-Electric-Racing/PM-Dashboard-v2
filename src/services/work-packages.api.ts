/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { apiUrls } from '../shared/urls';

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
    expectedActivities: workPackage.expectedActivities.map((bullet) => {
      return {
        ...bullet,
        dateAdded: new Date(bullet.dateAdded),
        dateDeleted: bullet.dateDeleted ? new Date(bullet.dateDeleted) : bullet.dateDeleted
      };
    })
  };
};

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
