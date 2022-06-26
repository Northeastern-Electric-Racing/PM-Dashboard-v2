/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import {
  datePipe,
  dollarsPipe,
  emDashPipe,
  endDatePipe,
  fullNamePipe,
  wbsStatusPipe,
  weeksPipe
} from '../../../../../shared/pipes';
import PageBlock from '../../../../layouts/page-block/page-block';
import styles from './project-details.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import ExternalLink from '../../../../components/external-link/external-link';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const start =
    project.workPackages.length > 0
      ? datePipe(
          project.workPackages.reduce(
            (min, cur) => (cur.startDate < min ? cur.startDate : min),
            project.workPackages[0].startDate
          )
        )
      : 'n/a';
  const end =
    project.workPackages.length > 0
      ? endDatePipe(
          project.workPackages.reduce(
            (min, cur) => (cur.startDate < min ? cur.startDate : min),
            project.workPackages[0].startDate
          ),
          project.workPackages.reduce((tot, cur) => tot + cur.duration, 0)
        )
      : 'n/a';

  const allColsStyle = 'mb-2';
  return (
    <PageBlock
      title={'Project Details'}
      headerRight={wbsStatusPipe(project.status)}
      body={
        <Container fluid>
          <Row>
            <Col className={allColsStyle} md={5} lg={4} xl={3}>
              <b>Project Lead:</b> {fullNamePipe(project.projectLead)}
            </Col>
            <Col className={allColsStyle} md={6} lg={4} xl={3}>
              <b>Project Manager:</b> {fullNamePipe(project.projectManager)}
            </Col>
            <Col className={allColsStyle} sm={4} md={4} lg={2} xl={2}>
              <b>Duration:</b> {weeksPipe(project.duration)}
            </Col>
            <Col className={allColsStyle} sm={4} md={4} lg={4} xl={2}>
              <b>Start Date:</b> {start}
            </Col>
            <Col className={allColsStyle} sm={4} md={4} lg={3} xl={2}>
              <b>End Date:</b> {end}
            </Col>
          </Row>
          <Row>
            <Col className={allColsStyle} sm={4} md={4} lg={4} xl={3}>
              <b>Budget:</b> {dollarsPipe(project.budget)}
            </Col>
            <Col className={allColsStyle} sm={4} md={4} lg={4} xl={3}>
              <b>Expected Progress:</b> {emDashPipe('')}
            </Col>
            <Col className={allColsStyle} sm={4} md={4} lg={4} xl={2}>
              <b>Timeline Status:</b> {emDashPipe('')}
            </Col>
            <Col className={allColsStyle} sm={12} md={8} lg={6} xl={4}>
              <div className={styles.horizontal}>
                <b>Links:</b>
                <li>
                  <ExternalLink link={project.slideDeckLink!} description={'Slide Deck'} />
                </li>
                <li>
                  <ExternalLink link={project.taskListLink!} description={'Task List'} />
                </li>
                <li>
                  <ExternalLink link={project.bomLink!} description={'BOM'} />
                </li>
                <li>
                  <ExternalLink link={project.gDriveLink!} description={'Google Drive'} />
                </li>
              </div>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      }
    />
  );
};

export default ProjectDetails;
