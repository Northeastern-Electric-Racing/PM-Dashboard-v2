/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { apiRoutes, Project, WbsNumber } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { useApiRequest } from './api-request';

/**
 * Transforms a project to ensure deep field transformation of date objects.
 *
 * @param project Incoming project object supplied by the HTTP response.
 * @returns Properly transformed project object.
 */
const projectTransformer = (project: Project) => {
  return {
    ...project,
    dateCreated: new Date(project.dateCreated)
  };
};

/**
 * Custom React Hook to supply the API response containing all projects.
 *
 * @returns All projects, via useApiRequest Hook pattern.
 */
export const useAllProjects = () => {
  return useApiRequest<Project[]>(
    { method: 'GET', url: apiRoutes.PROJECTS },
    (response: Project[]) => response.map(projectTransformer)
  );
};

/**
 * Custom React Hook to supply the API response containing a single project.
 *
 * @param wbsNum Project WBS number of the requested project.
 * @returns The requested project, via useApiRequest Hook pattern.
 */
export const useSingleProject = (wbsNum: WbsNumber) => {
  return useApiRequest<Project>(
    { method: 'GET', url: `${apiRoutes.PROJECTS}/${wbsPipe(wbsNum)}` },
    projectTransformer
  );
};
