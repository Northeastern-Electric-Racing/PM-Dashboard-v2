/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { WorkPackage, User, WbsElementStatus } from 'utils';
import { fullNamePipe, percentPipe, emDashPipe } from '../../../../../shared/pipes';
import PageBlock from '../../../../layouts/page-block/page-block';

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
    return (
      <Form.Group>
        <Form.Label>{title}</Form.Label>
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
    <Form.Control
      as="select"
      onChange={(e) => setters.setStatus(transformStatus(e.target.value))}
      custom
    >
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
        <Form.Control as="select" onChange={(e) => onChange(e.target.value)} custom>
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

  const buildUsersSelect = (
    title: string,
    defaultUser: User | undefined,
    updateUser: (val: number) => void
  ) => {
    let otherUsers = users;
    if (defaultUser !== undefined) {
      otherUsers = users.filter((user) => user.userId !== defaultUser.userId);
    }
    return (
      <>
        <b>{title}</b>
        <Form.Control
          as="select"
          data-testid={title}
          onChange={(e) => updateUser(parseInt(e.target.value))}
          custom
        >
          {defaultUser === undefined ? (
            <option key={-1} value={-1}>
              {emDashPipe('')}
            </option>
          ) : (
            <option key={defaultUser.userId} value={defaultUser.userId}>
              {fullNamePipe(defaultUser)}
            </option>
          )}
          {otherUsers.map((user) => (
            <option key={user.userId} value={user.userId}>
              {fullNamePipe(user)}
            </option>
          ))}
        </Form.Control>
        <br />
      </>
    );
  };

  const transformDate = (date: Date) => {
    const month =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate().toString();
    return `${date.getFullYear().toString()}-${month}-${day}`;
  };

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={<b>{statusSelect}</b>}
      body={
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              {editDetailsInputBuilder(
                'Work Package Name:',
                'text',
                workPackage.name,
                setters.setName
              )}
              {buildUsersSelect('Project Lead:', workPackage.projectLead, setters.setProjectLead)}
              {buildUsersSelect(
                'Project Manager:',
                workPackage.projectManager,
                setters.setProjectManager
              )}
              {editDetailsInputBuilder(
                'Duration:',
                'number',
                workPackage.duration,
                (val) => setters.setDuration(parseInt(val.trim())),
                '',
                'weeks'
              )}
            </Col>
            <Col xs={6} md={4}>
              {editDetailsInputBuilder(
                'Start Date:',
                'date',
                transformDate(workPackage.startDate),
                (val) => setters.setStartDate(new Date(val.replace(/-/g, '/'))) // must use / for date format to prevent day being behind by 1
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
            </Col>
          </Row>
        </Container>
      }
    />
  );
};

export default WorkPackageEditDetails;
