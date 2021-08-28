/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useQuery } from 'react-query';
import { Project, ProjectSummary, WbsNumber } from 'utils';
import { getAllProjects, getSingleProject } from './projects.api';

/**
 * Custom React Hook to supply all projects.
 */
export const useAllProjects = () => {
  return useQuery<ProjectSummary[], Error>('projects', async () => {
    const { data } = await getAllProjects();
    return data;
  });
};

/**
 * Custom React Hook to supply a single project.
 *
 * @param wbsNum WBS number of the requested project.
 */
export const useSingleProject = (wbsNum: WbsNumber) => {
  return useQuery<Project, Error>(['project', wbsNum], async () => {
    const { data } = await getSingleProject(wbsNum);
    return data;
  });
};
