/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { wbsPipe } from '../../../../../shared/pipes';
import styles from './standard-form-field.module.css';

const StandardFormFields: React.FC = () => {
  return (
    <div className={'row'}>
      <Form className={'px-4'}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>What</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Scope Impact</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Row className="align-items-center">
          <Col xs="auto" >
            Budget Impact
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="inlineFormInputGroup" placeholder="Budget please" />
            </InputGroup>
          </Col>
          <Col xs="auto" >
            Timeline Impact
            <InputGroup>
              <FormControl id="inlineFormInputGroup" placeholder="how many weeks?" />
              <InputGroup.Prepend>
                <InputGroup.Text>weeks</InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Form.Row>
      </Form>

      <Form className={'px-4'}>
        Why
        <Form.Group className={'px-4'}>
          {['Estimation Error', 'School Work', 'Manufacturing Issues', 'Rules Compliance', 'Other Project/Work Package', 'Other'].map((type) => (
            <Row key={type} className="mb-3">
              <Form.Check
                type="checkbox"
                id={type}
                label={type}
              />
              {(type === "Other Project/Work Package") &&
                <Form.Control as="select" custom>
                  {exampleAllWorkPackages.map((p) => (
                    <option>{wbsPipe(p.wbsNum)}</option>
                  ))}
                </Form.Control>}
              {(type === "Other") && <Form.Control type="text" />}
            </Row>
          ))}
        </Form.Group>
        Documentation Link
        <Form.Control type="text" />
      </Form>
    </div>

  );
};

export default StandardFormFields;
