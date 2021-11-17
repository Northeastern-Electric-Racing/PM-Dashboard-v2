/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project, WorkPackage } from 'utils';
import { useAllProjects } from '../../../services/projects.hooks';
import { fullNamePipe, listPipe, wbsPipe, weeksPipe } from '../../../shared/pipes';
import PrjsTable, { DisplayProject } from './projects-table/projects-table'; // Directly rename the default import
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../shared/error-page/error-page';
import styles from './projects-table.module.css';
import ProjectsTableFilter from './projects-table-filter/projects-table-filter';
import { Row } from 'react-bootstrap';
import { useState } from 'react';
import PageTitle from '../../shared/page-title/page-title';

/***
 * Returns a list of projects that has been filtered according to the given params.
 * @param projects The list of projects to filter.
 * @param carNumber The car the project is focused on.
 * @param status The status of the project.
 * @param projectLead The name of the user leading the project.
 * @param projectManager The name of the user managing the project.
 * @return The filtered list of projects.
 */
export function filterProjects(
  projects: Project[],
  carNumber: string,
  status: string,
  projectLead: string,
  projectManager: string
): Project[] {
  const carNumCheck = (project: Project) => {
    return carNumber === project.wbsNum.car.toString();
  };
  const statusCheck = (project: Project) => {
    return project.status === status;
  };
  const leadCheck = (project: Project) => {
    return listPipe(project.projectLead, fullNamePipe).includes(projectLead);
  };
  const managerCheck = (project: Project) => {
    return fullNamePipe(project.projectManager) === projectManager;
  };
  if (carNumber !== '') {
    projects = projects.filter(carNumCheck);
  }
  if (status !== '') {
    projects = projects.filter(statusCheck);
  }
  if (projectLead !== '') {
    projects = projects.filter(leadCheck);
  }
  if (projectManager !== '') {
    projects = projects.filter(managerCheck);
  }
  return projects;
}

/**
 * Parent component for the projects page housing the filter table and projects table.
 */
const ProjectsTable: React.FC = () => {
  const [status, setStatus] = useState('');
  const [projectLead, setProjectLead] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const { isLoading, isError, data, error } = useAllProjects();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const transformToDisplayProjects = (projects: Project[]) => {
    return projects.map((prj: Project) => {
      return {
        wbsNum: wbsPipe(prj.wbsNum),
        name: prj.name,
        projectLead: listPipe(prj.projectLead, fullNamePipe),
        projectManager: fullNamePipe(prj.projectManager),
        duration: weeksPipe(
          prj.workPackages.reduce((tot: number, cur: WorkPackage) => tot + cur.duration, 0)
        )
      };
    }) as DisplayProject[];
  };

  /**
   * Updates state with data from input parameters.
   * @param status The status of the project.
   * @param projectLead The project lead of the project.
   * @param projectManager The project manager of the project.
   * @param carNumber The carNumber of the project.
   */
  const sendDataToParent = (
    status: string,
    projectLead: string,
    projectManager: string,
    carNumber: string
  ) => {
    setStatus(status);
    setProjectLead(projectLead);
    setProjectManager(projectManager);
    setCarNumber(carNumber);
  };

  /**
   * Returns an array of user names who are listed as a project's lead.
   */
  const getLeads = (): string[] => {
    const projects = data!;
    const leads: string[] = [];
    for (const project of projects) {
      for (const user of project.projectLead) {
        const name: string = fullNamePipe(user);
        if (!leads.includes(name)) {
          leads.push(name);
        }
      }
    }
    return leads;
  };

  /**
   * Returns an array of user names who are listed as a project's managers.
   */
  const getManagers = (): string[] => {
    const projects = data!;
    const managers: string[] = [];
    for (const project of projects) {
      const name = fullNamePipe(project.projectManager);
      if (!managers.includes(name)) {
        managers.push(name);
      }
    }
    return managers;
  };

  return (
    <>
      <PageTitle title={'Projects'} />
      <div className={styles.container}>
        <Row>
          <div className={styles.filterTable}>
            <ProjectsTableFilter
              onClick={sendDataToParent}
              leads={getLeads()}
              managers={getManagers()}
            />
          </div>
          <div className={styles.projectsTable}>
            <PrjsTable
              allProjects={transformToDisplayProjects(
                filterProjects(data!, carNumber, status, projectLead, projectManager)
              )}
            />
          </div>
        </Row>
      </div>
    </>
  );
};

export default ProjectsTable;
