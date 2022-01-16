/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { wbsPipe } from '../../../../../shared/pipes';
import styles from './standard-form-fields.module.css';
import { Scope_CR_Why_Type } from '@prisma/client';

interface IProp {
  handleChange: (e: any) => void,
}

const whyInputName = {
  [Scope_CR_Why_Type.ESTIMATION]: 'estimation_error', 
  [Scope_CR_Why_Type.SCHOOL]: 'school_work', 
  [Scope_CR_Why_Type.MANUFACTURING]: 'manufacturing_issues', 
  [Scope_CR_Why_Type.RULES]: 'rules_compliance', 
  [Scope_CR_Why_Type.OTHER_PROJECT]: 'other_project', 
  [Scope_CR_Why_Type.OTHER]: 'other'
}

const whyInputDisplay = {
  [Scope_CR_Why_Type.ESTIMATION]: 'Estimation Error', 
  [Scope_CR_Why_Type.SCHOOL]: 'School Work', 
  [Scope_CR_Why_Type.MANUFACTURING]: 'Manufacturing Issues', 
  [Scope_CR_Why_Type.RULES]: 'Rules Compliance', 
  [Scope_CR_Why_Type.OTHER_PROJECT]: 'Other Project/Work Package', 
  [Scope_CR_Why_Type.OTHER]: 'Other'
}

const StandardFormFields: React.FC<IProp> = ({handleChange}) => {
  return (
    <Form>
      <div className={`${'row'} ${styles.container}`}>
        <div className={'px-4'}>
          <Form.Group controlId="newCR-what">
            <Form.Label>What</Form.Label>
            <Form.Control as="textarea" rows={3} name="what" onChange={handleChange}/>
          </Form.Group>

          <Form.Group controlId="newCR-scope-impact">
            <Form.Label>Scope Impact</Form.Label>
            <Form.Control as="textarea" rows={3} name="scopeImpact" onChange={handleChange}/>
          </Form.Group>
          <Form.Row className="align-items-center">
            <Col xs="auto" >
              <Form.Label>Budget Impact</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="newCR-budget-impact" name="budgetImpact" onChange={handleChange} type="number"/>
              </InputGroup>
            </Col>
            <Col xs="auto" >
              <Form.Label>Timeline Impact</Form.Label>
              <InputGroup>
                <FormControl id="newCR-timeline-impact" name="timelineImpact" onChange={handleChange} type="number"/>
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
            {Object.values(Scope_CR_Why_Type).map((type) => (
              <Row key={type} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={whyInputName[type] + '_id'}
                  label={whyInputDisplay[type]}
                  name={whyInputName[type]}
                  onChange={handleChange}
                  data-checktype={type}
                />
                {(type === Scope_CR_Why_Type.OTHER_PROJECT) &&
                  <Form.Control as="select" custom
                    id="newCR-wbs-num" name={whyInputName[type] + '_explain'} onChange={handleChange}>
                    {exampleAllWorkPackages.map((p) => (
                      <option key={p.id}>{wbsPipe(p.wbsNum)}</option>
                    ))}
                  </Form.Control>}
                {(type === Scope_CR_Why_Type.OTHER) && <Form.Control type="text"
                  id="newCR-other-type" name={whyInputName[type] + '_explain'} onChange={handleChange} />}
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
