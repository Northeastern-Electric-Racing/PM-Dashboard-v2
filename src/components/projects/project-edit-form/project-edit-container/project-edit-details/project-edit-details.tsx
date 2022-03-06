/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project, User } from 'utils';
import { Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import PageBlock from '../../../../shared/page-block/page-block';
import { wbsPipe, endDatePipe, fullNamePipe } from '../../../../../shared/pipes';
import { WbsElementStatus } from 'utils/lib/types/project-types';

// new parts added at the bottom
interface projectDetailsProps {
  project: Project;
  users: User[];
}

const ProjectEditDetails: React.FC<projectDetailsProps> = ({ project, users }) => {
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
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            readOnly={readOnly}
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
    <Form.Control as="select">
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

  const buildUsersSelect = (title: string, defaultUser: User) => {
    const otherUsers = users.filter((user) => {
      return user.userId !== defaultUser.userId;
    });
    return (
      <>
        <b>{title}</b>
        <Form.Control as="select">
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

  const detailsBody = (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          {editDetailsInputBuilder('Project Name:', 'text', project.name, '', '', '')}
          {editDetailsInputBuilder('WBS #:', 'text', wbsPipe(project.wbsNum), '', '', '', true)}
          {buildUsersSelect('Project Lead:', project.projectLead!)}
          {buildUsersSelect('Project Manager:', project.projectManager!)}
          {editDetailsInputBuilder('Budget:', 'number', project.budget, '$')}
        </Col>
        <Col xs={6} md={4}>
          {editDetailsInputBuilder('Duration:', 'number', project.duration, '', 'weeks', '', true)}
          {editDetailsInputBuilder('Start Date:', 'text', '', '', '', startDate, true)}
          {editDetailsInputBuilder('End Date:', 'text', '', '', '', endDate, true)}
          <br />
          {editDetailsInputBuilder(
            'Expected Progress:',
            'text',
            '',
            '',
            '',
            'Not implemented yet',
            true
          )}
          {editDetailsInputBuilder(
            'Timeline Status:',
            'text',
            '',
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
            '',
            '',
            'Slide deck link'
          )}
          {editDetailsInputBuilder(
            'Task List',
            'text',
            project.taskListLink!,
            '',
            '',
            'Task list link'
          )}
          {editDetailsInputBuilder(
            'BOM', 
            'text', 
            project.bomLink!, 
            '', 
            '', 
            'BOM link')}
          {editDetailsInputBuilder(
            'Google Drive',
            'text',
            project.gDriveLink!,
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
