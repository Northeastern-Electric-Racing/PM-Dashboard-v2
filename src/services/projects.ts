/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';
import { apiRoutes, Project, WbsNumber, WorkPackage } from 'utils';
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
 * Custom React Hook to supply the API response containing all projects.
 *
 * @returns All projects, via useApiRequest Hook pattern.
 */
export const useAllProjects = () => {
  const config: AxiosRequestConfig = useMemo(
    () => ({ method: 'GET', url: apiRoutes.PROJECTS }),
    []
  );
  const transformer = (response: Project[]) => response.map(projectTransformer);
  return useApiRequest<Project[]>(config, transformer);
};

/**
 * Custom React Hook to supply the API response containing a single project.
 *
 * @param wbsNum Project WBS number of the requested project.
 * @returns The requested project, via useApiRequest Hook pattern.
 */
export const useSingleProject = (wbsNum: WbsNumber) => {
  const config: AxiosRequestConfig = useMemo(
    () => ({ method: 'GET', url: `${apiRoutes.PROJECTS}/${wbsPipe(wbsNum)}` }),
    [wbsNum]
  );
  return useApiRequest<Project>(config, projectTransformer);
};
