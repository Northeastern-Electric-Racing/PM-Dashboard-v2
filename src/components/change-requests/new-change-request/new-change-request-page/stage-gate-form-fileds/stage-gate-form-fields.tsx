/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import styles from './stage-gate-form-fields.module.css';

const StageGateFormFields: React.FC = () => {
  return (
    <Form>
      <div className={styles.container}>
        <div className={'px-4'}>
          <Form.Group controlId="newCR-project-design-review">
            <Form.Label className={styles.label}>Who is Required for Design Review?</Form.Label>
            <Form.Control as="textarea" rows={3} />

            <Form.Label className={styles.label}>Leftover Budget</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="newCR-leftover-budget" />
            </InputGroup>
          </Form.Group>
        </div>

        <div className={'px-4'}>
          <Form.Label className={styles.label}>Is everything done?</Form.Label>
          <ul>
            <li>Completed WP deliverable</li>
            <li>Ensure rules compliance</li>
            <li>Creating any outstanding change requests</li>
            <li>Submitted all receipts to the procurement form</li>
            <li>Updated slide deck & documentation</li>
            <li>Completed all bullets and WP description</li>
          </ul>
          <Form.Group className={'px-4'} controlId="newCR-requirements">
            {['Yes', 'No'].map((type) => (
              <Row key={type} className="mb-3">
                <Form.Check
                  type="radio"
                  id={type}
                  label={type}
                />
              </Row>
            ))}
          </Form.Group>
        </div>
      </div>
    </Form>
  );
};

export default StageGateFormFields;
