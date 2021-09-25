/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import {
  dollarsPipe,
  endDatePipe,
  fullNamePipe,
  linkPipe,
  wbsPipe,
  weeksPipe
} from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './project-details.module.css';
import { Col, Container, Row } from 'react-bootstrap';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  const detailsBody = (
    <Container fluid className={styles.projectDetails}>
      <Row>
        <Col sm={6}><b>Project Name:</b> {project.name}</Col>
        <Col sm={6}><b>Duration:</b>{' '}{weeksPipe(project.workPackages.reduce((tot: any, cur: any) => tot + cur.duration, 0))}</Col>
      </Row>
      <Row>
        <Col sm={6}><b>WBS #:</b> {wbsPipe(project.wbsNum)}</Col>
        <Col sm={6}><b>Start Date:</b>{' '}
          {project.workPackages.length > 0
            ? project.workPackages
                .reduce(
                  (min: any, cur: any) => (cur.startDate < min ? cur.startDate : min),
                  project.workPackages[0].startDate
                )
                .toLocaleDateString()
            : 'n/a'}</Col>
      </Row>
      <Row>
        <Col sm={6}><b>Project Lead:</b> {fullNamePipe(project.projectLead)}</Col>
        <Col sm={6}><b>End Date:</b>{' '}
          {project.workPackages.length > 0
            ? endDatePipe(
                project.workPackages.reduce(
                  (min: any, cur: any) => (cur.startDate < min ? cur.startDate : min),
                  project.workPackages[0].startDate
                ),
                project.workPackages.reduce((tot: any, cur: any) => tot + cur.duration, 0)
              )
            : 'n/a'}</Col>
      </Row>
      <Row>
        <Col sm={6}><b>Project Manager:</b> {fullNamePipe(project.projectManager)}</Col>
        <Col sm={6}><b>Expected Progress:</b></Col>
      </Row>
      <Row>
        <Col sm={6}><b>Budget:</b> {dollarsPipe(project.budget)}</Col>
        <Col sm={6}><b>Timeline Status:</b></Col>
      </Row>
      <Row>
        <Col><div className={styles.horizontal}>
          <li>{linkPipe('Slide Deck', project.slideDeckLink)}</li>
          <li>{linkPipe('Task List', project.taskListLink)}</li>
          <li>{linkPipe('BOM', project.bomLink)}</li>
          <li>{linkPipe('Google Drive', project.gDriveLink)}</li>
        </div></Col>
      </Row>
    </Container>
  );

  return (
    <PageBlock title={'Project Details'} headerRight={<b>{project.status}</b>} body={detailsBody} />
  );
};

export default ProjectDetails;
