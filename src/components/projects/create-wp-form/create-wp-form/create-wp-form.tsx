/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import PageBlock from "../../../shared/page-block/page-block";
import PageTitle from "../../../shared/page-title/page-title";

interface CreateWPFormViewProps {
  dependencies: string[];
  expectedActivites: string[];
  deliverables: string[];
  onSubmit: (e: any) => any;
  onCancel: (e: any) => any;
}

const CreateWPFormView: React.FC<CreateWPFormViewProps> = ({
  dependencies,
  expectedActivites,
  deliverables,
  onSubmit,
  onCancel
}) => {
  return (
    <>
      <PageTitle title={'New Work Package'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <Form onSubmit={onSubmit}>
            <Row>
              <Col>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label htmlFor='wp-name'>Work Package Name</Form.Label>
                    <Form.Control id='wp-name' type='text' required></Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label htmlFor='project-wbs-num'>Project WBS Number</Form.Label>
                    <Form.Control id='project-wbs-num' type='text' required></Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label htmlFor='start-date'>Start Date</Form.Label>
                    <Form.Control id='start-date' type='date' required></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label htmlFor='start-date'>Duration</Form.Label>
                    <InputGroup>
                      <Form.Control id='start-date' type='date' required></Form.Control>
                      <InputGroup.Text>Weeks</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <Button className={'mr-3'} variant='primary' type='submit'>
                      Create
                    </Button>
                    <Button variant='secondary' type='button' onClick={onCancel}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        }
      />
    </>
  );
};

export default CreateWPFormView;
