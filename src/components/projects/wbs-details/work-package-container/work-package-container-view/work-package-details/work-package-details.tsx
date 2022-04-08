/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { WorkPackage, WbsElementStatus } from 'utils';
import { FormContext } from '../../work-package-container';
import { wbsPipe, endDatePipe, percentPipe, fullNamePipe } from '../../../../../../shared/pipes';
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
  const { editMode, setField } = useContext(FormContext);
  const { isLoading, isError, data, error } = useAllUsers();

  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const percentages = ["25%", "50%", "75%", "100%"]

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
          <EditableDetail title="Work Package Name" value={workPackage.name} type="text" />
          <EditableDetail
            title="WBS #"
            value={wbsPipe(workPackage.wbsNum)}
            type="text"
            readOnly={true}
          />
          <EditableDetail
            title="Project Lead"
            value={fullNamePipe(workPackage.projectLead)}
            type="select"
            options={usersWithoutAsStrings(workPackage.projectLead!)}
          />
          <EditableDetail
            title="Project Manager"
            value={fullNamePipe(workPackage.projectManager)}
            type="select"
            options={usersWithoutAsStrings(workPackage.projectManager!)}
          />
          <EditableDetail
            title="Duration"
            value={`${workPackage.duration}`}
            type="number"
            suffix="weeks"
            min={1}
          />
        </Col>
        <Col xs={6} md={4}>
          <EditableDetail
            title="Start Date"
            value={
              editMode
                ? formatDate(workPackage.startDate) // for a date input, format must be yyyy-mm-dd
                : workPackage.startDate.toLocaleDateString()
            }
            type="date"
          />
          <EditableDetail
            title="End Date"
            value={
              editMode
                ? formatDate(endDateAsDatePipe())
                : endDatePipe(workPackage.startDate, workPackage.duration)
            }
            type="date"
            readOnly={true}
          />
          <EditableDetail
            title="Progress"
            value={percentPipe(workPackage.progress)}
            type="select"
            options={percentages}
          />
          <EditableDetail
            title="Expected Progress"
            value={percentPipe(workPackage.expectedProgress)}
            type="number"
            readOnly={true}
          />
          <EditableDetail
            title="Timeline Status"
            value={workPackage.timelineStatus}
            type="text"
            readOnly={true}
          />
        </Col>
      </Row>
    </Container>
  );

  const statuses = Object.values(WbsElementStatus);
  const index = statuses.indexOf(workPackage.status);
  statuses.splice(index, 1);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={
        editMode ? (
          <div>
            <label>Status</label>
            <Form.Control as="select" onChange={(e) => setField('status', e.target.value)}>
              <option>{workPackage.status}</option>
              {statuses.map((status) => (
                <option>{status}</option>
              ))}
            </Form.Control>
          </div>
        ) : (
          <b>{workPackage.status}</b>
        )
      }
      body={detailsBody}
    />
  );
};

export default WorkPackageDetails;
