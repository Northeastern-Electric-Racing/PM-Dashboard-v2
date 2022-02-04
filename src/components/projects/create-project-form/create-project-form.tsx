/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PageBlock from "../../shared/page-block/page-block";
import PageTitle from "../../shared/page-title/page-title";

const CreateProjectForm: React.FC = () => {
  const history = useHistory();

  const goBack = () => history.goBack();

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
                <Col>
                  <Row>
                    <Form.Group as={Col} aria-required>
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control type='text' placeholder='Enter project name...' required />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} aria-required>
                      <Form.Label>Car Number</Form.Label>
                      <Form.Control type='text' placeholder='Enter car number...' required />
                    </Form.Group>
                    <Form.Group as={Col} aria-required>
                      <Form.Label>Change Request ID</Form.Label>
                      <Form.Control type='text' placeholder='Enter change request ID...' required />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} aria-required>
                      <Form.Label>Project Summary</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={4}
                        cols={50}
                        placeholder='Enter summary...'
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col className={'d-flex'}>
                      <Button className={'mr-3'} variant='primary' type='submit'>
                        Create
                      </Button>
                      <Button variant='secondary' type='button' onClick={() => goBack()}>
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

export default CreateProjectForm;
