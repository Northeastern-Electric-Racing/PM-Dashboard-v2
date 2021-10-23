/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project, WorkPackage } from 'utils';
import { useAllProjects } from '../../../services/projects.hooks';
import { weeksPipe, fullNamePipe, wbsPipe } from '../../../shared/pipes';
import { DisplayProject } from './projects-table/projects-table';
import PrjsTable from './projects-table/projects-table'; // Directly rename the default import
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../shared/error-page/error-page';
import styles from './projects-table.module.css';
import ProjectsTableFilter from './projects-table-filter/projects-table-filter';
import { Row } from 'react-bootstrap';
import PageTitle from '../../shared/page-title/page-title';
import React, { useState } from 'react';

/**
 * Parent component for the projects page housing the filter table and projects table.
 */
const ProjectsTable: React.FC = () => {
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');
  const [projectLead, setProjectLead] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const { isLoading, isError, data, error } = useAllProjects();
  const [carNumber, setCarNumber] = useState('');

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const transformToDisplayProjects = (projects: Project[]) => {
    return projects.map((prj: Project) => {
      return {
        wbsNum: wbsPipe(prj.wbsNum),
        name: prj.name,
        projectLead: fullNamePipe(prj.projectLead),
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
   * @param year The year the project was created.
   * @param projectLead The project lead of the project.
   * @param projectManager The project manager of the project.
   * @param carNumber The carNumber of the project.
   */
  const sendDataToParent = (
    status: string,
    year: string,
    projectLead: string,
    projectManager: string,
    carNumber: string
  ) => {
    setStatus(status);
    setYear(year);
    setProjectLead(projectLead);
    setProjectManager(projectManager);
    setCarNumber(carNumber);
  };

  /**
   * Returns a list of projects that has been filtered according to
   * the current state of the filter parameters.
   */
  const filterProjects = (): Project[] => {
    let projects = data!;
    const carNumCheck = (project: Project) => {
      return carNumber === project.wbsNum.car.toString();
    };
    const statusCheck = (project: Project) => {
      return project.status === status;
    };
    const yearCheck = (project: Project) => {
      return `${project.dateCreated.getUTCFullYear()}` === year;
    };
    const leadCheck = (project: Project) => {
      return fullNamePipe(project.projectLead) === projectLead;
    };
    const managerCheck = (project: Project) => {
      return fullNamePipe(project.projectManager) === projectManager;
    };
    if (carNumber != '') {
      projects = projects.filter(carNumCheck);
    }
    if (status != '') {
      projects = projects.filter(statusCheck);
    }
    if (year != '') {
      projects = projects.filter(yearCheck);
    }
    if (projectLead != '') {
      projects = projects.filter(leadCheck);
    }
    if (projectManager != '') {
      projects = projects.filter(managerCheck);
    }
    return projects;
  };

  const filtered_data: Project[] = filterProjects();

  return (
    <>
      <PageTitle title={'Projects'} />
      <div className={styles.container}>
        <Row>
          <div className={styles.filterTable}>
            <ProjectsTableFilter onClick={sendDataToParent} />
          </div>
          <div className={styles.projectsTable}>
            <PrjsTable allProjects={transformToDisplayProjects(filtered_data)} />
          </div>
        </Row>
      </div>
    </>
  );
};

export default ProjectsTable;
