/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { Project, WbsNumber, WorkPackageSummary } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { apiUrls } from '../shared/urls';
import { projectTransformer } from './transformers/projects.transformers';

const workPackageSummaryTransformer = (workPackageSummary: WorkPackageSummary) => {
  return {
    ...workPackageSummary,
    startDate: new Date(workPackageSummary.startDate),
    endDate: new Date(workPackageSummary.endDate)
  } as WorkPackageSummary;
};

/**
 * Fetches all projects.
 */
export const getAllProjects = () => {
  return axios.get<Project[]>(apiUrls.projects(), {
    transformResponse: (data) => JSON.parse(data).map(projectTransformer)
  });
};

/**
 * Fetches a single change request.
 *
 * @param wbsNum Project WBS number of the requested project.
 */
export const getSingleProject = (wbsNum: WbsNumber) => {
  return axios.get<Project>(apiUrls.projectsByWbsNum(wbsPipe(wbsNum)), {
    transformResponse: (data) => projectTransformer(JSON.parse(data))
  });
};
