/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { ChangeRequestReason } from 'utils';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { wbsPipe } from '../../../../../shared/pipes';
import styles from './standard-form-fields.module.css';

interface StandardFormFieldsProp {
  handleChange: (e: any) => void;
}

const whyInputName = {
  [ChangeRequestReason.Estimation]: 'estimation_error',
  [ChangeRequestReason.School]: 'school_work',
  [ChangeRequestReason.Manufacturing]: 'manufacturing_issues',
  [ChangeRequestReason.Rules]: 'rules_compliance',
  [ChangeRequestReason.OtherProject]: 'other_project',
  [ChangeRequestReason.Other]: 'other',
  [ChangeRequestReason.Design]: 'design'
};

const whyInputDisplay = {
  [ChangeRequestReason.Estimation]: 'Estimation Error',
  [ChangeRequestReason.School]: 'School Work',
  [ChangeRequestReason.Manufacturing]: 'Manufacturing Issues',
  [ChangeRequestReason.Rules]: 'Rules Compliance',
  [ChangeRequestReason.OtherProject]: 'Other Project/Work Package',
  [ChangeRequestReason.Other]: 'Other',
  [ChangeRequestReason.Design]: 'Design'
};

const StandardFormFields: React.FC<StandardFormFieldsProp> = ({ handleChange }) => {
  return (
    <Form>
      <div className={`${'row'} ${styles.container}`}>
        <div className={'px-4'}>
          <Form.Group controlId="newCR-what">
            <Form.Label>What</Form.Label>
            <Form.Control as="textarea" rows={3} name="what" onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="newCR-scope-impact">
            <Form.Label>Scope Impact</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="scopeImpact"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Label>Budget Impact</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  id="newCR-budget-impact"
                  name="budgetImpact"
                  onChange={handleChange}
                  type="number"
                  min={0}
                  required
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Form.Label>Timeline Impact</Form.Label>
              <InputGroup aria-required>
                <FormControl
                  id="newCR-timeline-impact"
                  name="timelineImpact"
                  onChange={handleChange}
                  type="number"
                  min={0}
                  required
                />
                <InputGroup.Prepend>
                  <InputGroup.Text>weeks</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
          </Form.Row>
        </div>

        <div className={'px-4'}>
          <Form.Label>Why</Form.Label>
          <Form.Group className={'px-4'} controlId="newCR-type">
            {Object.values(ChangeRequestReason).map((type: ChangeRequestReason) => (
              <Row key={type} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={whyInputName[type] + '_id'}
                  label={whyInputDisplay[type]}
                  name={whyInputName[type]}
                  onChange={handleChange}
                  data-checktype={type}
                />
                {type === ChangeRequestReason.OtherProject && (
                  <Form.Control
                    as="select"
                    custom
                    id="newCR-wbs-num"
                    name={whyInputName[type] + '_explain'}
                    onChange={handleChange}
                  >
                    {exampleAllWorkPackages.map((p) => (
                      <option key={p.id}>{wbsPipe(p.wbsNum)}</option>
                    ))}
                  </Form.Control>
                )}
                {type === ChangeRequestReason.Other && (
                  <Form.Control
                    type="text"
                    id="newCR-other-type"
                    name={whyInputName[type] + '_explain'}
                    onChange={handleChange}
                  />
                )}
              </Row>
            ))}
          </Form.Group>
          <Form.Label>Documentation Link</Form.Label>
          <Form.Control type="text" id="newCR-documentation-link" />
        </div>
      </div>
    </Form>
  );
};

export default StandardFormFields;
