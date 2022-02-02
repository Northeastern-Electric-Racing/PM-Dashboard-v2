/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Col, Form, Row } from "react-bootstrap";
import ActionButton from "../../../../shared/action-button/action-button";
import PageBlock from "../../../../shared/page-block/page-block";
import PageTitle from "../../../../shared/page-title/page-title";

const CreateProjectForm: React.FC = () => {
  return (
    <>
      <PageTitle title={'New Project'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <div>
            <Form>
              <Row>
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control type='text' placeholder='Enter project name...' />
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Car Number</Form.Label>
                    <Form.Control type='text' placeholder='Enter car number...' />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Change Request ID</Form.Label>
                    <Form.Control type='text' placeholder='Enter change request ID...' />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Project Summary</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={4}
                    cols={50}
                    placeholder='Enter summary...'
                  />
                </Form.Group>
              </Row>
              <Row>
                <Button variant='success' type='submit'>
                  Create
                </Button>
                <Button variant='secondary' type='button' onClick={() => alert('replace with reroute back to cr details page for that specific change request')}>
                  Cancel
                </Button>
              </Row>
            </Form>
          </div>
        }
      />
    </>
  );
};

export default CreateProjectForm;
