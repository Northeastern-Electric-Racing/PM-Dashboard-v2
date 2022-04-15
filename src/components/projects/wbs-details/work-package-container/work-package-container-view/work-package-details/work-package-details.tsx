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
  details: any;
  setters: any;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ details, setters }) => {
  const { editMode, setField } = useContext(FormContext);
  const { isLoading, isError, data, error } = useAllUsers();

  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const percentages = ['25%', '50%', '75%', '100%'];

  const endDateAsDatePipe = () => {
    const endDate = new Date(details.startDate);
    endDate.setDate(endDate.getDate() + details.duration * 7);
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
          <EditableDetail title="Work Package Name" value={details.name} type="text" />
          <EditableDetail
            title="WBS #"
            value={wbsPipe(details.wbsElementId)}
            type="text"
            readOnly={true}
            setter={setters.setWbsElementId}
          />
          <EditableDetail
            title="Project Lead"
            value={fullNamePipe(details.projectLead)}
            type="select"
            options={usersWithoutAsStrings(details.projectLead!)}
            setter={setters.setProjectLead}
          />
          <EditableDetail
            title="Project Manager"
            value={fullNamePipe(details.projectManager)}
            type="select"
            options={usersWithoutAsStrings(details.projectManager!)}
            setter={setters.setProjectManager}
          />
          <EditableDetail
            title="Duration"
            value={`${details.duration}`}
            type="number"
            suffix="weeks"
            min={1}
            setter={(e: string) => setters.setDuration(parseInt(e))}
          />
        </Col>
        <Col xs={6} md={4}>
          <EditableDetail
            title="Start Date"
            value={
              editMode
                ? formatDate(details.startDate) // for a date input, format must be yyyy-mm-dd
                : details.startDate.toLocaleDateString()
            }
            type="date"
            setter={setters.setStartDate}
          />
          <EditableDetail
            title="End Date"
            value={
              editMode
                ? formatDate(endDateAsDatePipe())
                : endDatePipe(details.startDate, details.duration)
            }
            type="date"
            readOnly={true}
          />
          <EditableDetail
            title="Progress"
            value={percentPipe(details.progress)}
            type="select"
            options={percentages}
            setter={(e: string) => setters.setProgress(parseInt(e))}
          />
          <EditableDetail
            title="Expected Progress"
            value={percentPipe(details.expectedProgress)}
            type="number"
            readOnly={true}
          />
          <EditableDetail
            title="Timeline Status"
            value={details.timelineStatus}
            type="text"
            readOnly={true}
          />
        </Col>
      </Row>
    </Container>
  );

  const statuses = Object.values(WbsElementStatus);
  const index = statuses.indexOf(details.status);
  statuses.splice(index, 1);

  const transformStatus = (status: string | undefined) => {
    switch (status) {
      case 'ACTIVE':
        return WbsElementStatus.Active;
      case 'INACTIVE':
        return WbsElementStatus.Inactive;
      default:
        return WbsElementStatus.Complete;
    }
  };

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={
        editMode ? (
          <div>
            <label>Status</label>
            <Form.Control
              as="select"
              onChange={(e) => setters.setStatus(transformStatus(e.target.value))}
            >
              <option>{details.status}</option>
              {statuses.map((status) => (
                <option>{status}</option>
              ))}
            </Form.Control>
          </div>
        ) : (
          <b>{details.status}</b>
        )
      }
      body={detailsBody}
    />
  );
};

export default WorkPackageDetails;
