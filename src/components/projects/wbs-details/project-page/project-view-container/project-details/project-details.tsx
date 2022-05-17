/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import {
  datePipe,
  dollarsPipe,
  endDatePipe,
  fullNamePipe,
  linkPipe,
  wbsPipe,
  wbsStatusPipe,
  weeksPipe
} from '../../../../../../shared/pipes';
import PageBlock from '../../../../../shared/page-block/page-block';
import styles from './project-details.module.css';
import { Col, Container, Row } from 'react-bootstrap';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  const detailsBody = (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          <div>
            <b>Project Name:</b> {project.name} <br />
            <b>WBS #:</b> {wbsPipe(project.wbsNum)} <br />
            <b>Project Lead:</b> {fullNamePipe(project.projectLead)} <br />
            <b>Project Manager:</b> {fullNamePipe(project.projectManager)} <br />
            <b>Budget:</b> {dollarsPipe(project.budget)}
          </div>
        </Col>
        <Col xs={6} md={4}>
          <div>
            <b>Duration:</b>{' '}
            {weeksPipe(project.workPackages.reduce((tot, cur) => tot + cur.duration, 0))} <br />
            <b>Start Date:</b>{' '}
            {project.workPackages.length > 0
              ? datePipe(
                  project.workPackages.reduce(
                    (min, cur) => (cur.startDate < min ? cur.startDate : min),
                    project.workPackages[0].startDate
                  )
                )
              : 'n/a'}{' '}
            <br />
            <b>End Date:</b>{' '}
            {project.workPackages.length > 0
              ? endDatePipe(
                  project.workPackages.reduce(
                    (min, cur) => (cur.startDate < min ? cur.startDate : min),
                    project.workPackages[0].startDate
                  ),
                  project.workPackages.reduce((tot, cur) => tot + cur.duration, 0)
                )
              : 'n/a'}{' '}
            <br />
            <b>Expected Progress:</b> <br />
            <b>Timeline Status:</b>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.horizontal}>
            <li>{linkPipe('Slide Deck', project.slideDeckLink!)}</li>
            <li>{linkPipe('Task List', project.taskListLink!)}</li>
            <li>{linkPipe('BOM', project.bomLink!)}</li>
            <li>{linkPipe('Google Drive', project.gDriveLink!)}</li>
          </div>
        </Col>
      </Row>
    </Container>
  );

  return (
    <PageBlock
      title={'Project Details'}
      headerRight={wbsStatusPipe(project.status)}
      body={detailsBody}
    />
  );
};

export default ProjectDetails;
