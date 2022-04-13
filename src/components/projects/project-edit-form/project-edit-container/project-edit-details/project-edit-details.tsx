/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project, User } from 'utils';
import { Col, Container, Row, Form, InputGroup, Dropdown } from 'react-bootstrap';
import PageBlock from '../../../../shared/page-block/page-block';
import { wbsPipe, endDatePipe, fullNamePipe } from '../../../../../shared/pipes';
import { WbsElementStatus } from 'utils/lib/types/project-types';
import styles from './project-edit-details.module.css';

// new parts added at the bottom
interface projectDetailsProps {
  project: Project;
  users: User[];
  updateSlideDeck: (val: string) => void;
  updateTaskList: (val: string) => void;
  updateBom: (val: string) => void;
  updateGDrive: (val: string) => void;
  updateName: (val: string) => void;
  updateBudget: (val: string) => void;
  updateStatus: (val: WbsElementStatus) => void;
  updateProjectLead: (val: number) => void;
  updateProjectManager: (val: number) => void;
}

const ProjectEditDetails: React.FC<projectDetailsProps> = ({
  project,
  users,
  updateSlideDeck,
  updateTaskList,
  updateBom,
  updateGDrive,
  updateName,
  updateBudget,
  updateStatus,
  updateProjectLead,
  updateProjectManager
}) => {
  const statuses = Object.values(WbsElementStatus).filter((status) => status !== project.status);
  const startDate =
    project.workPackages.length > 0
      ? project.workPackages
          .reduce(
            (min, cur) => (cur.startDate < min ? cur.startDate : min),
            project.workPackages[0].startDate
          )
          .toLocaleDateString()
      : 'n/a';
  const endDate =
    project.workPackages.length > 0
      ? endDatePipe(
          project.workPackages.reduce(
            (min, cur) => (cur.startDate < min ? cur.startDate : min),
            project.workPackages[0].startDate
          ),
          project.workPackages.reduce((tot, cur) => tot + cur.duration, 0)
        )
      : 'n/a';

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

  const statusSelect = (
    <Form.Control as="select" onChange={(e) => updateStatus(e.target.value as WbsElementStatus)}>
      <option key={0} value={project.status}>
        {project.status}
      </option>
      {statuses.map((status, index) => (
        <option key={index + 1} value={status}>
          {status}
        </option>
      ))}
    </Form.Control>
  );

  const buildUsersSelect = (
    title: string,
    defaultUser: User,
    updateUser: (val: number) => void
  ) => {
    const otherUsers = users.filter((user) => {
      return user.userId !== defaultUser.userId;
    });
    return (
      <>
        <b>{title}</b>
        {/* <Form>
          <Form.Group>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle
                variant="light"
                block={true}
                className={'text-left ' + styles.dropdownButton}
              >
                {fullNamePipe(defaultUser)}
              </Dropdown.Toggle>
              <Dropdown.Menu className="btn-block" align="right">
                <Dropdown.Item
                  key={defaultUser.userId}
                  onClick={() => updateUser(defaultUser.userId)}
                >
                  {fullNamePipe(defaultUser)}
                </Dropdown.Item>
                {otherUsers.map((user, index) => (
                  <Dropdown.Item
                    key={user.userId}
                    onClick={() => updateUser(user.userId)}
                    value={fullNamePipe(user)}
                  >
                    {fullNamePipe(user)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Form> */}
        <Form.Control as="select">
          <option
            onChange={(e) => updateUser(defaultUser.userId)}
            onClick={(e) => updateUser(defaultUser.userId)}
            onSelect={(e) => updateUser(defaultUser.userId)}
            onInput={(e) => updateUser(defaultUser.userId)}
            onFocus={(e) => updateUser(defaultUser.userId)}
            key={defaultUser.userId}
            value={fullNamePipe(defaultUser)}
          >
            {fullNamePipe(defaultUser)}
          </option>
          {otherUsers.map((user, index) => (
            <option
              key={user.userId}
              onChange={(e) => updateUser(user.userId)}
              onClick={(e) => updateUser(user.userId)}
              onSelect={(e) => updateUser(user.userId)}
              onInput={(e) => updateUser(user.userId)}
              onFocus={(e) => updateUser(user.userId)}
              value={fullNamePipe(user)}
            >
              {fullNamePipe(user)}
            </option>
          ))}
        </Form.Control>
        <br />
      </>
    );
  };

  const detailsBody = (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          {editDetailsInputBuilder('Project Name:', 'text', project.name, updateName, '', '', '')}
          {editDetailsInputBuilder(
            'WBS #:',
            'text',
            wbsPipe(project.wbsNum),
            null,
            '',
            '',
            '',
            true
          )}
          {buildUsersSelect('Project Lead:', project.projectLead!, updateProjectLead)}
          {buildUsersSelect('Project Manager:', project.projectManager!, updateProjectManager)}
          {editDetailsInputBuilder('Budget:', 'number', project.budget, updateBudget, '$')}
        </Col>
        <Col xs={6} md={4}>
          {editDetailsInputBuilder(
            'Duration:',
            'number',
            project.duration,
            null,
            '',
            'weeks',
            '',
            true
          )}
          {editDetailsInputBuilder('Start Date:', 'text', '', null, '', '', startDate, true)}
          {editDetailsInputBuilder('End Date:', 'text', '', null, '', '', endDate, true)}
          <br />
          {editDetailsInputBuilder(
            'Expected Progress:',
            'text',
            '',
            null,
            '',
            '',
            'Not implemented yet',
            true
          )}
          {editDetailsInputBuilder(
            'Timeline Status:',
            'text',
            '',
            null,
            '',
            '',
            'Not implemented yet',
            true
          )}
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col>
          {editDetailsInputBuilder(
            'Slide Deck',
            'text',
            project.slideDeckLink!,
            updateSlideDeck,
            '',
            '',
            'Slide deck link'
          )}
          {editDetailsInputBuilder(
            'Task List',
            'text',
            project.taskListLink!,
            updateTaskList,
            '',
            '',
            'Task list link'
          )}
          {editDetailsInputBuilder('BOM', 'text', project.bomLink!, updateBom, '', '', 'BOM link')}
          {editDetailsInputBuilder(
            'Google Drive',
            'text',
            project.gDriveLink!,
            updateGDrive,
            '',
            '',
            'Google drive link'
          )}
        </Col>
      </Row>
    </Container>
  );

  return (
    <PageBlock title={'Project Details (EDIT)'} headerRight={statusSelect} body={detailsBody} />
  );
};

export default ProjectEditDetails;
