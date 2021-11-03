/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, ButtonGroup, Card, Dropdown, Form } from 'react-bootstrap';
import styles from './projects-table-filter.module.css';
import { useState } from 'react';

/**
 * Variables to filter table with.
 */
interface FilterProps {
  leads: string[];
  managers: string[];
  onClick: (status: string, projectLead: string, projectManager: string, carNumber: string) => void;
}

/**
 * Interactive table for setting filter parameters.
 * @param onClick Determines what happens when the Apply button is clicked.
 * @param leads The list of names of project leads.
 * @param managers The list of names of project managers.
 */
const ProjectsTableFilter: React.FC<FilterProps> = ({ onClick, leads, managers }: FilterProps) => {
  const [status, setStatus] = useState('');
  const [project_lead, setProject_lead] = useState('');
  const [project_manager, setProject_manager] = useState('');
  const [car_number, setCar_number] = useState('');

  /**
   * Programmatically generates dropdown items for project leads dropdown menu.
   */
  const ProjectLeads = () => {
    const none = (
      <Dropdown.Item key={'None'} data-testid="lead-none" onClick={() => setProject_lead('')}>
        None
      </Dropdown.Item>
    );
    let result: any[] = [none];
    for (let lead of leads) {
      result.push(
        <Dropdown.Item
          key={lead}
          data-testid={'lead-' + lead}
          onClick={() => setProject_lead(lead)}
        >
          {lead}
        </Dropdown.Item>
      );
    }
    return <div>{result}</div>;
  };

  /**
   * Programmatically generates dropdown items for project managers dropdown menu.
   */
  const ProjectManagers = () => {
    const none = (
      <Dropdown.Item key={'None'} data-testid="manager-none" onClick={() => setProject_manager('')}>
        None
      </Dropdown.Item>
    );
    let result: any[] = [none];
    for (let manager of managers) {
      result.push(
        <Dropdown.Item
          key={manager}
          data-testid={'manager-' + manager}
          onClick={() => setProject_manager(manager)}
        >
          {manager}
        </Dropdown.Item>
      );
    }
    return <div>{result}</div>;
  };

  const noneCheck = (val: string): string => {
    if (val == 'None') {
      return '';
    }
    return val;
  };

  return (
    <>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title>Filters</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Car Number</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {car_number}
                </Button>
                <Dropdown.Toggle
                  data-testid="car-num-toggle"
                  split
                  variant="light"
                  id="dropdown-split-basic"
                  block={true}
                />
                <Dropdown.Menu data-testid="car-num-menu" className="btn-block">
                  {['None', '1', '2'].map((val) => (
                    <Dropdown.Item
                      key={val}
                      data-testid={'car-num-' + val.toLowerCase()}
                      onClick={() => setCar_number(noneCheck(val))}
                    >
                      {val}
                    </Dropdown.Item>
                  ))}
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
                <Dropdown.Menu data-testid="status-menu" className="btn-block">
                  {['None', 'Active', 'Inactive', 'Complete'].map((val) => (
                    <Dropdown.Item
                      key={val}
                      data-testid={'status-' + val.toLowerCase()}
                      onClick={() => setStatus(noneCheck(val))}
                    >
                      {val}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Lead</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {project_lead}
                </Button>
                <Dropdown.Toggle
                  data-testid="lead-toggle"
                  split
                  variant="light"
                  id="dropdown-split-basic"
                  block={true}
                />
                <Dropdown.Menu data-testid="lead-menu" className="btn-block">
                  {ProjectLeads()}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Manager</Form.Label>
              <Dropdown as={ButtonGroup} className={styles.dropdown}>
                <Button variant="light" className={styles.button}>
                  {project_manager}
                </Button>
                <Dropdown.Toggle
                  data-testid="manager-toggle"
                  split
                  variant="light"
                  id="dropdown-split-basic"
                  block={true}
                />
                <Dropdown.Menu data-testid="manager-menu" className="btn-block">
                  {ProjectManagers()}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <div className={styles.applyButton}>
              <Button
                variant="danger"
                data-testid="apply-button"
                onClick={() => {
                  onClick(status, project_lead, project_manager, car_number);
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
