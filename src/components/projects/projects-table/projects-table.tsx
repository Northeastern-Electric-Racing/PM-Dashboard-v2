/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ProjectSummary } from 'utils';
import { useAllProjects } from '../../../services/projects.hooks';
import { weeksPipe, fullNamePipe, wbsPipe } from '../../../shared/pipes';
import { DisplayProject } from './projects-table/projects-table';
import PrjsTable from './projects-table/projects-table'; // Directly rename the default import
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../shared/error-page/error-page';
import './projects-table.module.css';

const ProjectsTable: React.FC = () => {
  const { isLoading, isError, data, error } = useAllProjects();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const transformToDisplayProjects = (projects: ProjectSummary[]) => {
    return projects.map((prj) => {
      return {
        ...prj,
        wbsNum: wbsPipe(prj.wbsNum),
        projectLead: fullNamePipe(prj.projectLead),
        projectManager: fullNamePipe(prj.projectManager),
        duration: weeksPipe(prj.duration)
      };
    }) as DisplayProject[];
  };

  return <PrjsTable allProjects={transformToDisplayProjects(data!)} />;
};

export default ProjectsTable;
