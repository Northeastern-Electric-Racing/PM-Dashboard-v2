/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PageBlock from "../../../shared/page-block/page-block";

const CreateProjectFormView: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <PageBlock
        title={'New Project'}
        headerRight={<></>}
        body={
          <div>
            <Form>
              <Row>
                <Col>
                  <Row>
                    <Form.Group as={Col} aria-required>
                      <Form.Label htmlFor='project-name'>Project Name</Form.Label>
                      <Form.Control id='project-name' type='text' placeholder='Enter project name...' required />
                      <Form.Control.Feedback type='invalid'>Please provide a project name.</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} aria-required>
                      <Form.Label htmlFor='car-number'>Car Number</Form.Label>
                      <Form.Control id='car-number' type='number' min={0} placeholder='Enter car number...' required />
                      <Form.Control.Feedback type='invalid'>Please provide a valid car number.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} aria-required>
                      <Form.Label htmlFor='cr-id'>Change Request ID</Form.Label>
                      <Form.Control id='cr-id' type='number' min={1} placeholder='Enter change request ID...' required />
                      <Form.Control.Feedback type='invalid'>Please provide a valid change request ID.</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} aria-required>
                      <Form.Label htmlFor='project-summary'>Project Summary</Form.Label>
                      <Form.Control
                        id='project-summary'
                        as='textarea'
                        rows={4}
                        cols={50}
                        placeholder='Enter summary...'
                        required
                      />
                      <Form.Control.Feedback type='invalid'>Please provide a project summary.</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col className={'d-flex'}>
                      <Button className={'mr-3'} variant='primary' type='submit'>
                        Create
                      </Button>
                      <Button variant='secondary' type='button' onClick={() => history.goBack()}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
        }
      />
    </>
  );
};

export default CreateProjectFormView;
