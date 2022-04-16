/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { WorkPackage, WbsElementStatus } from 'utils';
import {
  wbsPipe,
  endDatePipe,
  percentPipe,
  fullNamePipe,
  datePipe
} from '../../../../../../shared/pipes';
import PageBlock from '../../../../../shared/page-block/page-block';
import EditableDetail from '../../../../../shared/editable-detail/editable-detail';
import { useAllUsers } from '../../../../../../services/users.hooks';
import LoadingIndicator from '../../../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../../../shared/error-page/error-page';
import { User } from 'utils';
import './work-package-details.module.css';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
  const { isLoading, isError, data, error } = useAllUsers();

  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const percentages = ['25%', '50%', '75%', '100%'];

  const endDateAsDatePipe = () => {
    const endDate = new Date(workPackage.startDate);
    endDate.setDate(endDate.getDate() + workPackage.duration * 7);
    return endDate;
  };

  const usersWithoutAsStrings = (user: User) => {
    if (data) {
      const users = data;
      const otherUsers = users.filter((otherUser) => {
        return otherUser.userId !== user.userId;
      });
      return otherUsers.map((otherUser) => fullNamePipe(otherUser));
    }
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

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={<b>{workPackage.status}</b>}
      body={detailsBody}
    />
  );
};

export default WorkPackageDetails;
