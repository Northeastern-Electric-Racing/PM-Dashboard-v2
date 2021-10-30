/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, ButtonGroup, Card, Dropdown, Form } from 'react-bootstrap';
import styles from './projects-table-filter.module.css';
import { fullNamePipe } from '../../../../shared/pipes';
import React, { useState } from 'react';

/**
 * Variables to filter table with.
 */
interface FilterProps {
  leads: string[];
  managers: string[];
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
const ProjectsTableFilter: React.FC<FilterProps> = ({ onClick, leads, managers }: FilterProps) => {
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
    let result: any[] = [];
    for (let lead of leads) {
      result.push(<Dropdown.Item onClick={() => setProjectLead(lead)}>{lead}</Dropdown.Item>);
    }
    return <div>{result}</div>;
  };

  /**
   * Programmatically generates dropdown items for project managers dropdown menu.
   */
  const ProjectManagers = () => {
    let result: any[] = [];
    for (let manager of managers) {
      result.push(
        <Dropdown.Item onClick={() => setProjectManager(manager)}>{manager}</Dropdown.Item>
      );
    }
    return <div>{result}</div>;
  };

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
                <Dropdown.Toggle
                  data-testid="car-num-toggle"
                  split
                  variant="light"
                  id="dropdown-split-basic"
                  block={true}
                />
                <Dropdown.Menu data-testid="car-num-menu" className="btn-block">
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
                <Dropdown.Toggle
                  data-testid="status-toggle"
                  split
                  variant="light"
                  id="dropdown-split-basic"
                  block={true}
                />
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setStatus('')}>None</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatus('Active')}>Active</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatus('Inactive')}>Inactive</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatus('Complete')}>Complete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Lead</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {projectLead}
                </Button>
                <Dropdown.Toggle
                  data-testid="lead-toggle"
                  split
                  variant="light"
                  id="dropdown-split-basic"
                  block={true}
                />
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setProjectLead('')}>None</Dropdown.Item>
                  {ProjectLeads()}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Manager</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {projectManager}
                </Button>
                <Dropdown.Toggle
                  data-testid="manager-toggle"
                  split
                  variant="light"
                  id="dropdown-split-basic"
                  block={true}
                />
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setProjectManager('')}>None</Dropdown.Item>
                  {ProjectManagers()}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Year Created</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {year}
                </Button>
                <Dropdown.Toggle
                  data-testid="year-toggle"
                  split
                  variant="light"
                  id="dropdown-split-basic"
                  block={true}
                />
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item onClick={() => setYear('')}>None</Dropdown.Item>
                  {Years()}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <div className={styles.applyButton}>
              <Button
                variant="danger"
                data-testid="apply-toggle"
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
