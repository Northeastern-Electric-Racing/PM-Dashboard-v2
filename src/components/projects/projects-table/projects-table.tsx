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
import './projects-table.module.css';
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
      <Container>
        <Row>
          <Col className="row-cols-2">
            <ProjectsTableFilter />
          </Col>
          <Col className="row-cols-1">
            <PrjsTable allProjects={transformToDisplayProjects(data!)} />
          </Col>
        </Row>
      </Container>
    </>
    //TODO: Use React Bootstrap table to organize this properly.
  );
};

export default ProjectsTable;
