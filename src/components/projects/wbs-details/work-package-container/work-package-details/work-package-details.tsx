/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import { weeksPipe, wbsPipe, endDatePipe, fullNamePipe } from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './work-package-details.module.css';
import { Col, Container, Row } from 'react-bootstrap';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
  const detailsBody = (
      <Container fluid className={styles.workPackageDetails}>
        <Row>
        <Col><b>Work Package Name:</b> {workPackage.name}</Col>
        <Col><b>Duration:</b> {weeksPipe(workPackage.duration)}</Col>
        </Row>
        <Row>
        <Col><b>WBS #:</b> {wbsPipe(workPackage.wbsNum)}</Col>
        <Col><b>Start Date:</b> {workPackage.startDate.toLocaleDateString()}</Col>
        </Row>
        <Row>
          <Col> <b>Project Lead:</b> {fullNamePipe(workPackage.projectLead)}</Col>
          <Col><b>End Date:</b> {endDatePipe(workPackage.startDate, workPackage.duration)}</Col>
        </Row>
        <Row>
          <Col><b>Project Manager:</b> {fullNamePipe(workPackage.projectManager)}</Col>
          <Col><b>Progress:</b> {workPackage.progress}%</Col>
        </Row>
        <Row>
          <Col><b>Budget:</b></Col>
          <Col><b>Expected Progress:</b></Col>
        </Row>
        <Row>
          <Col><b>Deliverables:</b></Col>
          <Col><b>Timeline Status:</b></Col>
        </Row>
      </Container>
  );

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={<b>{workPackage.status}</b>}
      body={detailsBody}
    />
  );
};

export default WorkPackageDetails;
