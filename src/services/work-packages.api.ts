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
