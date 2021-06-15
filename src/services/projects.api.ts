/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { Project, WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { apiUrls } from '../shared/urls';

/**
 * Transforms a project to ensure deep field transformation of date objects.
 *
 * @param project Incoming project object supplied by the HTTP response.
 * @returns Properly transformed project object.
 */
const projectTransformer = (project: Project) => {
  return {
    ...project,
    dateCreated: new Date(project.dateCreated),
    workPackages: project.workPackages.map((ele: WorkPackage) => {
      return {
        ...ele,
        startDate: new Date(ele.startDate)
      };
    })
  };
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
