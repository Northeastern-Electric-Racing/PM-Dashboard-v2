/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useRef, useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import PageBlock from "../../../shared/page-block/page-block";
import PageTitle from "../../../shared/page-title/page-title";
import MutableFormInputList from "./mutable-form-input-list/mutable-form-input-list";

interface CreateWPFormViewProps {
  dependencies: string[];
  setDependencies: (e: any) => any;
  expectedActivities: string[];
  deliverables: string[];
  onSubmit: (e: any) => any;
  onCancel: (e: any) => any;
}

const CreateWPFormView: React.FC<CreateWPFormViewProps> = ({
  dependencies,
  setDependencies,
  expectedActivities,
  deliverables,
  onSubmit,
  onCancel
}) => {
  const [deps, setDeps] = useState<string[]>([]);
  const depRef = useRef<HTMLInputElement>(null);

  const addDep = () => {
    deps.push(depRef.current!.value);
    console.log(deps);
    setDeps(deps);
  };
  console.log('render');
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
                    <Form.Label htmlFor='duration'>Duration</Form.Label>
                    <InputGroup>
                      <Form.Control id='duration' type='number' required></Form.Control>
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
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label htmlFor='dependencies'>Dependencies</Form.Label>
                      <Form.Control id='dependencies' ref={depRef} type='text' />
                      <Button type='button' variant='success' onClick={() => addDep()}>+</Button>
                      {/* <MutableFormInputList items={deps} setItems={setDeps} type={'text'} /> */}
                      {deps}
                    </Form.Group>

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
