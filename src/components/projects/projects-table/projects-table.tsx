/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project, User } from 'utils';
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

/**
 * Generate a list of User IDs from a list of Users.
 * @param users The list of users passed in.
 * @return A list of numbers representing the IDs of the users in the given list of users.
 */
const getUserIDs = (users: User[]) => {
  const answer: number[] = [];
  for (const user of users) {
    answer.push(user.userId);
  }
  return answer;
};

/***
 * Returns a list of projects that has been filtered according to the given params.
 * @param projects The list of projects to filter.
 * @param carNumber The car the project is focused on.
 * @param status The status of the project.
 * @param projectLeadID The id of the user leading the project.
 * @param projectManagerID The id of the user managing the project.
 * @return The filtered list of projects.
 */
export function filterProjects(
  projects: Project[],
  carNumber: number,
  status: string,
  projectLeadID: number,
  projectManagerID: number
): Project[] {
  const carNumCheck = (project: Project) => {
    return carNumber === project.wbsNum.car;
  };
  const statusCheck = (project: Project) => {
    return project.status === status;
  };
  const leadCheck = (project: Project) => {
    return getUserIDs(project.projectLead).includes(projectLeadID);
  };
  const managerCheck = (project: Project) => {
    return project.projectManager?.userId === projectManagerID;
  };
  if (carNumber !== -1) {
    projects = projects.filter(carNumCheck);
  }
  if (status !== '') {
    projects = projects.filter(statusCheck);
  }
  if (projectLeadID !== -1) {
    projects = projects.filter(leadCheck);
  }
  if (projectManagerID !== -1) {
    projects = projects.filter(managerCheck);
  }
  return projects;
}

/**
 * Parent component for the projects page housing the filter table and projects table.
 */
const ProjectsTable: React.FC = () => {
  const [status, setStatus] = useState('');
  const [projectLeadID, setProjectLeadID] = useState(-1);
  const [projectManagerID, setProjectManagerID] = useState(-1);
  const [carNumber, setCarNumber] = useState(-1);
  const { isLoading, isError, data, error } = useAllProjects();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const transformToDisplayProjects = (projects: Project[]) => {
    return projects.map((prj) => {
      return {
        ...prj,
        wbsNum: wbsPipe(prj.wbsNum),
        name: prj.name,
        projectLead: listPipe(prj.projectLead, fullNamePipe),
        projectManager: fullNamePipe(prj.projectManager),
        duration: weeksPipe(prj.duration)
      };
    }) as DisplayProject[];
  };

  /**
   * Updates state with data from input parameters.
   * @param status The status of the project.
   * @param projectLeadID The project lead of the project.
   * @param projectManagerID The project manager of the project.
   * @param carNumber The carNumber of the project.
   */
  const sendDataToParent = (
    status: string,
    projectLeadID: number,
    projectManagerID: number,
    carNumber: number
  ) => {
    setStatus(status);
    setProjectLeadID(projectLeadID);
    setProjectManagerID(projectManagerID);
    setCarNumber(carNumber);
  };

  /**
   * Returns an array of Users who are listed as a project's lead.
   */
  const getLeads = (): User[] => {
    const projects = data!;
    const leads: User[] = [];
    const seenList: number[] = [];
    for (const project of projects) {
      for (const user of project.projectLead) {
        if (!seenList.includes(user.userId)) {
          seenList.push(user.userId);
          leads.push(user);
        }
      }
    }
    return leads;
  };

  /**
   * Returns an array of Users who are listed as a project's managers.
   */
  const getManagers = (): User[] => {
    const projects = data!;
    const managers: User[] = [];
    const seenList: number[] = [];
    for (const project of projects) {
      if (!seenList.includes(project.projectManager!.userId)) {
        seenList.push(project.projectManager!.userId);
        managers.push(project.projectManager!);
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
                filterProjects(data!, carNumber, status, projectLeadID, projectManagerID)
              )}
            />
          </div>
        </Row>
      </div>
    </>
  );
};

export default ProjectsTable;
