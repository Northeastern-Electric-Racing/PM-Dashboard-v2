/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import PageBlock from "../../../shared/page-block/page-block";
import PageTitle from "../../../shared/page-title/page-title";
import { EditableTextInputListUtils } from "../create-wp-form";
import EditableTextInputList from "../../../shared/editable-text-input-list/editable-text-input-list";

interface CreateWPFormViewProps {
  dependencies: string[];
  depUtils: EditableTextInputListUtils;
  expectedActivities: string[];
  eaUtils: EditableTextInputListUtils;
  deliverables: string[];
  delUtils: EditableTextInputListUtils;
  onSubmit: (e: any) => any;
  onCancel: (e: any) => any;
}

const CreateWPFormView: React.FC<CreateWPFormViewProps> = ({
  dependencies,
  depUtils,
  expectedActivities,
  eaUtils,
  deliverables,
  delUtils,
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
                    <Form.Control id='start-date' aria-label={'start date input'} type='date' required></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label htmlFor='duration'>Duration</Form.Label>
                    <InputGroup>
                      <Form.Control id='duration' aria-label={'duration'} type='number' required></Form.Control>
                      <InputGroup.Text>Weeks</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Dependencies</Form.Label>
                      <EditableTextInputList
                        items={dependencies}
                        add={depUtils.add}
                        remove={depUtils.remove}
                        update={depUtils.update}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Expected Activities</Form.Label>
                      <EditableTextInputList
                        items={expectedActivities}
                        add={eaUtils.add}
                        remove={eaUtils.remove}
                        update={eaUtils.update}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Deliverables</Form.Label>
                      <EditableTextInputList
                        items={deliverables}
                        add={delUtils.add}
                        remove={delUtils.remove}
                        update={delUtils.update}
                      />
                    </Form.Group>
                  </Col>
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
