/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Card, Dropdown, Form } from 'react-bootstrap';
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
   * Programmatically generates dropdown menu items.
   * @param type The project property represented by each menu item in the list.
   * @param values The list of menu item values.
   * @param setter The setter function for the variable the component records.
   * @return An array of dropdown menu items.
   */
  const genDropdownItems = (
    type: string,
    values: string[],
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const none = (
      <Dropdown.Item key={'None'} onClick={() => setter('')}>
        None
      </Dropdown.Item>
    );
    let result: any[] = [none];
    for (let value of values) {
      result.push(
        <Dropdown.Item key={value} onClick={() => setter(value)}>
          {value}
        </Dropdown.Item>
      );
    }
    return <div>{result}</div>;
  };

  return (
    <>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title>Filters</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Car Number</Form.Label>
              <Dropdown>
                <div className={styles.dropdown}>
                  <Button variant="light" className={'text-left ' + styles.button}>
                    {car_number}
                  </Button>
                  <Dropdown.Toggle
                    data-testid="car-num-toggle"
                    split
                    variant="light"
                    id="dropdown-split-basic"
                    block={true}
                  />
                  <Dropdown.Menu className="btn-block">
                    {genDropdownItems('car-num', ['1', '2'], setCar_number)}
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Dropdown>
                <div className={styles.dropdown}>
                  <Button variant="light" className={'text-left ' + styles.button}>
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
                    {genDropdownItems('status', ['Active', 'Inactive', 'Complete'], setStatus)}
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Lead</Form.Label>
              <Dropdown>
                <div className={styles.dropdown}>
                  <Button variant="light" className={'text-left ' + styles.button}>
                    {project_lead}
                  </Button>
                  <Dropdown.Toggle
                    data-testid="lead-toggle"
                    split
                    variant="light"
                    id="dropdown-split-basic"
                    block={true}
                  />
                  <Dropdown.Menu className="btn-block">
                    {genDropdownItems('lead', leads, setProject_lead)}
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Manager</Form.Label>
              <Dropdown>
                <div className={styles.dropdown}>
                  <Button variant="light" className={'text-left ' + styles.button}>
                    {project_manager}
                  </Button>
                  <Dropdown.Toggle
                    data-testid="manager-toggle"
                    split
                    variant="light"
                    id="dropdown-split-basic"
                    block={true}
                  />
                  <Dropdown.Menu className="btn-block">
                    {genDropdownItems('manager', managers, setProject_manager)}
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            </Form.Group>
            <div className={styles.applyButton}>
              <Button
                variant="ner-red"
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
