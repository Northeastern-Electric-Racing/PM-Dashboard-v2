/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, ButtonGroup, Card, Dropdown, Form } from 'react-bootstrap';
import styles from './projects-table-filter.module.css';
import { useAllUsers } from '../../../../services/users.hooks';
import { fullNamePipe } from '../../../../shared/pipes';
import { Role, User } from 'utils';
import React, { useState } from 'react';

/**
 * Variables to filter table with.
 */
interface FilterProps {
  onClick: (
    status: string,
    year: string,
    projectLead: string,
    projectManager: string,
    carNumber: string
  ) => void;
}

/**
 * Interactive table for setting filter parameters.
 * @param onClick Determines what happens when the Apply button is clicked.
 */
const ProjectsTableFilter: React.FC<FilterProps> = ({ onClick }: FilterProps) => {
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');
  const [projectLead, setProjectLead] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const [carNumber, setCarNumber] = useState('');

  /**
   * Programmatically generates dropdown items for years menu.
   */
  const Years = () => {
    const start: number = 2019;
    const current_year: number = new Date().getUTCFullYear();
    let result: any[] = [];
    for (let i = 0; i < current_year - start + 1; i++) {
      result.push(
        <Dropdown.Item key={start + i} onClick={() => setYear(`${start + i}`)}>
          {start + i}
        </Dropdown.Item>
      );
    }
    return <div>{result}</div>;
  };

  /**
   * Programmatically generates dropdown items for project leads dropdown menu.
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
        result.push(
          <Dropdown.Item onClick={() => setProjectLead(fullNamePipe(data.data[i]))}>
            {fullNamePipe(data.data[i])}
          </Dropdown.Item>
        );
      }
    }
    return <div>{result}</div>;
  };

  /**
   * Programmatically generates dropdown items for project dropdown managers menu.
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
        result.push(
          <Dropdown.Item onClick={() => setProjectManager(fullNamePipe(data.data[i]))}>
            {fullNamePipe(data.data[i])}
          </Dropdown.Item>
        );
      }
    }
    return <div>{result}</div>;
  };

  const dropdownToggle = (
    <Dropdown.Toggle split variant="light" id="dropdown-split-basic" block={true} />
  );

  return (
    <>
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Title>Filters</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Car Number</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {carNumber}
                </Button>
                {dropdownToggle}
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setCarNumber('')}>None</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCarNumber('1')}>1</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCarNumber('2')}>2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {status}
                </Button>
                {dropdownToggle}
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setStatus('')}>None</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatus('Active')}>Active</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatus('Inactive')}>Inactive</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatus('Complete')}>Complete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Lead</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {projectLead}
                </Button>
                {dropdownToggle}
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setProjectLead('')}>None</Dropdown.Item>
                  {ProjectLeads()}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Manager</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {projectManager}
                </Button>
                {dropdownToggle}
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setProjectManager('')}>None</Dropdown.Item>
                  {ProjectManagers()}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year Created</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {year}
                </Button>
                {dropdownToggle}
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setYear('')}>None</Dropdown.Item>
                  {Years()}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <div>
              <Button
                variant="danger"
                onClick={() => {
                  onClick(status, year, projectLead, projectManager, carNumber);
                }}
              >
                Apply
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProjectsTableFilter;
