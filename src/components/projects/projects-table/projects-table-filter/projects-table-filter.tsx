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
              <Dropdown className={styles.dropdown}>
                <Dropdown.Toggle
                  data-testid='car-num-toggle'
                  variant='light'
                  id='dropdown-split-basic'
                  block={true}
                  className={'text-left ' + styles.dropdownButton}
                >{car_number}</Dropdown.Toggle>
                <Dropdown.Menu className='btn-block' align='right'>
                  {genDropdownItems('car-num', ['1', '2'], setCar_number)}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Dropdown className={styles.dropdown}>
                <Dropdown.Toggle
                  data-testid='status-toggle'
                  variant='light'
                  id='dropdown-split-basic'
                  block={true}
                  className={'text-left ' + styles.dropdownButton}
                >{status}</Dropdown.Toggle>
                <Dropdown.Menu className='btn-block' align='right'>
                  {genDropdownItems('status', ['Active', 'Inactive', 'Complete'], setStatus)}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Lead</Form.Label>
              <Dropdown className={styles.dropdown}>
                <Dropdown.Toggle
                  data-testid='lead-toggle'
                  variant='light'
                  id='dropdown-split-basic'
                  block={true}
                  className={'text-left ' + styles.dropdownButton}
                >{project_lead}</Dropdown.Toggle>
                <Dropdown.Menu className='btn-block' align='right'>
                  {genDropdownItems('lead', leads, setProject_lead)}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Manager</Form.Label>
              <Dropdown className={styles.dropdown}>
                <Dropdown.Toggle
                  data-testid='manager-toggle'
                  variant='light'
                  id='dropdown-split-basic'
                  block={true}
                  className={'text-left ' + styles.dropdownButton}
                >{project_manager}</Dropdown.Toggle>
                <Dropdown.Menu className='btn-block' align='right'>
                  {genDropdownItems('manager', managers, setProject_manager)}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Button
              variant='ner-red'
              className={styles.applyButton}
              onClick={() => {
                onClick(status, project_lead, project_manager, car_number);
              }}
            >
              Apply
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProjectsTableFilter;
