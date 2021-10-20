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
import { Col, Container, Row } from 'react-bootstrap';
import PageTitle from '../../shared/page-title/page-title';

const ProjectsTable: React.FC = () => {
  const { isLoading, isError, data, error } = useAllProjects();

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

  return (
    <>
      <PageTitle title={'Projects'} />
      <div className={styles.container}>
        <Row>
          <div className={styles.column}>
            <ProjectsTableFilter />
          </div>
          <div className={styles.column2}>
            <PrjsTable allProjects={transformToDisplayProjects(data!)} />
          </div>
        </Row>
      </div>
    </>
  );
};

export default ProjectsTable;
