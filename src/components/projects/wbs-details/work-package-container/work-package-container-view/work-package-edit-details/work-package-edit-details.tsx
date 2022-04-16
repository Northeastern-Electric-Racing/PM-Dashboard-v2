/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { WorkPackage, User, WbsElementStatus } from 'utils';
import { fullNamePipe, wbsPipe, datePipe, percentPipe } from '../../../../../../shared/pipes';
import PageBlock from '../../../../../shared/page-block/page-block';

interface Props {
  workPackage: WorkPackage;
  users: User[];
  setters: any;
}

const WorkPackageEditDetails: React.FC<Props> = ({ workPackage, users, setters }) => {
  const editDetailsInputBuilder = (
    title: string,
    type: string,
    defaultValue: any,
    updateState: ((val: string) => void) | null,
    prefix = '',
    suffix = '',
    placeholder = '',
    readOnly = false
  ) => {
    const formInput = (
      <Form.Group>
        <InputGroup>
          {prefix ? <InputGroup.Text>{prefix}</InputGroup.Text> : <></>}
          <Form.Control
            required
            type={type}
            min={0}
            defaultValue={defaultValue}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={(e) => {
              if (updateState !== null) {
                updateState(e.target.value);
              }
            }}
          />
          {suffix ? <InputGroup.Text>{suffix}</InputGroup.Text> : <></>}
        </InputGroup>
      </Form.Group>
    );

    return (
      <>
        <b>{title}</b>
        {formInput}
        <br />
      </>
    );
  };

  const statuses = Object.values(WbsElementStatus).filter(
    (status) => status !== workPackage.status
  );

  const transformStatus = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return WbsElementStatus.Active;
      case 'INACTIVE':
        return WbsElementStatus.Inactive;
      default:
        return WbsElementStatus.Complete;
    }
  };

  const statusSelect = (
    <Form.Control as="select" onChange={(e) => setters.setStatus(transformStatus(e.target.value))}>
      <option key={0} value={workPackage.status}>
        {workPackage.status}
      </option>
      {statuses.map((status, index) => (
        <option key={index + 1} value={status}>
          {status}
        </option>
      ))}
    </Form.Control>
  );

  const percentages = [25, 50, 75, 100];

  const buildProgressSelect = (title: string, defaultVal: number, onChange: any) => {
    const otherProgress = percentages.filter((percentage) => percentage !== defaultVal);
    return (
      <>
        <b>{title}</b>
        <Form.Control as="select" onChange={(e) => onChange(e.target.value)}>
          <option key={defaultVal} value={defaultVal}>
            {`${defaultVal}%`}
          </option>
          {otherProgress.map((progress, index) => (
            <option key={progress} value={progress}>
              {`${progress}%`}
            </option>
          ))}
        </Form.Control>
        <br />
      </>
    );
  };

  const buildUsersSelect = (title: string, defaultUser: User | undefined, onChange: any) => {
    if (!defaultUser) {
      return (
        <>
          <b>{title}</b>
          <Form.Control as="select" onChange={(e) => onChange(e.target.value)}>
            {users.map((user, index) => (
              <option key={user.userId} value={fullNamePipe(user)}>
                {fullNamePipe(user)}
              </option>
            ))}
          </Form.Control>
          <br />
        </>
      );
    }

    const otherUsers = users.filter((user) => user.userId !== defaultUser.userId);
    return (
      <>
        <b>{title}</b>
        <Form.Control as="select" onChange={(e) => onChange(e.target.value)}>
          <option key={defaultUser.userId} value={fullNamePipe(defaultUser)}>
            {fullNamePipe(defaultUser)}
          </option>
          {otherUsers.map((user, index) => (
            <option key={user.userId} value={fullNamePipe(user)}>
              {fullNamePipe(user)}
            </option>
          ))}
        </Form.Control>
        <br />
      </>
    );
  };

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

  // const usersWithoutAsStrings = (user: User) => {
  //   if (data) {
  //     const users = data;
  //     const otherUsers = users.filter((otherUser) => {
  //       return otherUser.userId !== user.userId;
  //     });
  //     return otherUsers.map((otherUser) => fullNamePipe(otherUser));
  //   }
  // };
  const transformDate = (date: Date) => {
    const month =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString();
    return `${date.getFullYear().toString()}-${month}-${day}`;
  };

  const detailsBody = (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          {editDetailsInputBuilder('Work Package Name:', 'text', workPackage.name, setters.setName)}
          {editDetailsInputBuilder(
            'WBS #:',
            'text',
            wbsPipe(workPackage.wbsNum),
            null,
            '',
            '',
            '',
            true
          )}
          {buildUsersSelect('Project Lead:', workPackage.projectLead!, setters.setProjectLead)}
          {buildUsersSelect(
            'Project Manager:',
            workPackage.projectManager!,
            setters.setProjectManager
          )}
          {editDetailsInputBuilder('Duration:', 'number', workPackage.duration, (val) =>
            setters.setDuration(parseInt(val.trim()))
          )}
        </Col>
        <Col xs={6} md={4}>
          {editDetailsInputBuilder(
            'Start Date:',
            'date',
            transformDate(workPackage.startDate),
            (val) => setters.setStartDate(new Date(val.replace(/-/g, '/'))) // must use / for date format to prevent day being behind by 1
          )}
          {editDetailsInputBuilder(
            'End Date:',
            'text',
            '',
            null,
            '',
            '',
            datePipe(endDateAsDatePipe()),
            true
          )}
          {buildProgressSelect('Progress:', workPackage.progress, (val: string) =>
            setters.setProgress(parseInt(val.trim()))
          )}
          {editDetailsInputBuilder(
            'Expected Progress:',
            'number',
            '',
            null,
            '',
            '',
            percentPipe(workPackage.expectedProgress),
            true
          )}
          {editDetailsInputBuilder(
            'Timeline Status:',
            'text',
            '',
            null,
            '',
            '',
            workPackage.timelineStatus,
            true
          )}
        </Col>
      </Row>
    </Container>
  );

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={<b>{statusSelect}</b>}
      body={detailsBody}
    />
  );
};

export default WorkPackageEditDetails;
