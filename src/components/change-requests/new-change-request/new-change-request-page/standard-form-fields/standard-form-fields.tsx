/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { wbsPipe } from '../../../../../shared/pipes';
import styles from './standard-form-fields.module.css';

const StandardFormFields: React.FC = () => {
  return (
    <Form>
      <div className={`${'row'} ${styles.container}`}>
        <div className={'px-4'}>
          <Form.Group controlId="newCR-what">
            <Form.Label>What</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Form.Group controlId="newCR-scope-impact">
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
                <FormControl id="newCR-budget-impact" />
              </InputGroup>
            </Col>
            <Col xs="auto" >
              Timeline Impact
              <InputGroup>
                <FormControl id="newCR-timeline-impact" />
                <InputGroup.Prepend>
                  <InputGroup.Text>weeks</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
          </Form.Row>
        </div>

        <div className={'px-4'}>
          Why
          <Form.Group className={'px-4'} controlId="newCR-type">
            {['Estimation Error', 'School Work', 'Manufacturing Issues', 'Rules Compliance', 'Other Project/Work Package', 'Other'].map((type) => (
              <Row key={type} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={type}
                  label={type}
                />
                {(type === "Other Project/Work Package") &&
                  <Form.Control as="select" custom
                    id="newCR-wbs-num">
                    {exampleAllWorkPackages.map((p) => (
                      <option key={p.id}>{wbsPipe(p.wbsNum)}</option>
                    ))}
                  </Form.Control>}
                {(type === "Other") && <Form.Control type="text"
                  id="newCR-other-type" />}
              </Row>
            ))}
          </Form.Group>
          Documentation Link
          <Form.Control type="text" id="newCR-documentation-link" />
        </div>
      </div>
    </Form>
  );
};

export default StandardFormFields;
