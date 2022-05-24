/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Col, Container, Row } from 'react-bootstrap';
import { WorkPackage } from 'utils';
import {
  wbsPipe,
  percentPipe,
  fullNamePipe,
  datePipe,
  wbsStatusPipe
} from '../../../../../shared/pipes';
import PageBlock from '../../../../layouts/page-block/page-block';
import './work-package-details.module.css';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const endDateAsDatePipe = () => {
    const endDate = new Date(workPackage.startDate);
    endDate.setDate(endDate.getDate() + workPackage.duration * 7);
    return endDate;
  };

  const detailsBody = (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          <b>Work Package Name:</b> {workPackage.name} <br />
          <b>WBS #:</b> {wbsPipe(workPackage.wbsNum)} <br />
          <b>Project Lead:</b> {fullNamePipe(workPackage.projectLead)} <br />
          <b>Project Manager:</b> {fullNamePipe(workPackage.projectManager)} <br />
          <b>Duration:</b> {workPackage.duration}
        </Col>
        <Col xs={6} md={4}>
          <b>Start Date:</b> {datePipe(workPackage.startDate)} <br />
          <b>End Date:</b> {datePipe(endDateAsDatePipe())} <br />
          <b>Progress:</b> {percentPipe(workPackage.progress)} <br />
          <b>Expected Progress:</b> {percentPipe(workPackage.expectedProgress)} <br />
          <b>Timeline Status:</b> {workPackage.timelineStatus}
        </Col>
      </Row>
    </Container>
  );

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={wbsStatusPipe(workPackage.status)}
      body={detailsBody}
    />
  );
};

export default WorkPackageDetails;
