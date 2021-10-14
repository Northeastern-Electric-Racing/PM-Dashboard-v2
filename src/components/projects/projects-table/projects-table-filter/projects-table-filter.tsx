/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Card, Dropdown, Form } from 'react-bootstrap';

export interface FilterButtons {
  group: string;
  status: string;
  projectLead: string;
  projectManager: string;
  yearCreated: number;
}

interface FilterProps {
  allFilterButtons: FilterButtons[];
}

//TODO: Add appropriate logic.
const ProjectsTableFilter: React.FC = () => {
  return (
    <>
      <style type="text/css">
        {`
        .btn-block:after {
          float: right;
        }
      `}
      </style>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Filters</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="btn-block"
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item href="#/action-1">Mechanical</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Electrical</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Business</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">Software</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="btn-block"
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item href="#/action-1">Active</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Inactive</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Complete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Lead</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="btn-block"
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item href="#/action-1">Insert Name(s) Here</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Manager</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="btn-block"
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item href="#/action-1">Insert Name(s) Here</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year Created</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="btn-block"
                  block={true}
                ></Dropdown.Toggle>
                <Dropdown.Menu className="btn-block">
                  <Dropdown.Item href="#/action-1">Insert Year(s) Here</Dropdown.Item>
                </Dropdown.Menu>
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
