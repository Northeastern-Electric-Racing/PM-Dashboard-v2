/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Card, Dropdown, Form } from 'react-bootstrap';
import styles from './projects-table-filter.module.css';
import { useAllUsers } from '../../../../services/users.hooks';
import { fullNamePipe } from '../../../../shared/pipes';
import { Role, User } from 'utils';

/**
 * Programmatically generates dropdown items for years menu.
 */
const Years = () => {
  const start: number = 2019;
  const current_year: number = new Date().getUTCFullYear();
  let result: any[] = [];
  for (let i = 0; i < current_year - start + 1; i++) {
    result.push(<Dropdown.Item>{start + i}</Dropdown.Item>);
  }
  return <div>{result}</div>;
};

/**
 * Programmatically generates dropdown items for project leads menu.
 */
const ProjectLeads = () => {
  const leadCheck = (user: User) => {
    return user.role === Role.ProjectLead;
  };
  const data = useAllUsers();
  let result: any[] = [];
  if (data.data != undefined) {
    data.data = data.data.filter(leadCheck);
    for (let i = 0; i < data.data.length; i++) {
      result.push(<Dropdown.Item>{fullNamePipe(data.data[i])}</Dropdown.Item>);
    }
  }
  return <div>{result}</div>;
};

/**
 * Programmatically generates dropdown items for project managers menu.
 */
const ProjectManagers = () => {
  const data = useAllUsers();
  const managerCheck = (user: User) => {
    return user.role === Role.ProjectManager;
  };
  let result: any[] = [];
  if (data.data != undefined) {
    data.data = data.data.filter(managerCheck);
    for (let i = 0; i < data.data.length; i++) {
      result.push(<Dropdown.Item>{fullNamePipe(data.data[i])}</Dropdown.Item>);
    }
  }
  return <div>{result}</div>;
};

//TODO: Add appropriate filtering logic.
const ProjectsTableFilter: React.FC = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Filters</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className={styles.dropdownToggle}
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item>Mechanical</Dropdown.Item>
                  <Dropdown.Item>Electrical</Dropdown.Item>
                  <Dropdown.Item>Business</Dropdown.Item>
                  <Dropdown.Item>Software</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className={styles.dropdownToggle}
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item>Active</Dropdown.Item>
                  <Dropdown.Item>Inactive</Dropdown.Item>
                  <Dropdown.Item>Complete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Lead</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className={styles.dropdownToggle}
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">{ProjectLeads()}</Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Manager</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className={styles.dropdownToggle}
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">{ProjectManagers()}</Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year Created</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className={styles.dropdownToggle}
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">{Years()}</Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <div className="col text-center">
              <Button variant="danger">Apply</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProjectsTableFilter;
