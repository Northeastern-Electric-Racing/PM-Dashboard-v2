/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { exampleAllUsers } from '../../../../../test-support/test-data/users.stub';
import { fullNamePipe } from '../../../../../shared/pipes';
import styles from './activation-form-fields.module.css';

interface ActivationFormFieldsProp {
  handleChange: (e: any) => void,
  handleStartDateChange: (d: Date) => void
}

const ActivationFormFields: React.FC<ActivationFormFieldsProp> = ({handleChange, handleStartDateChange}) => {
  return (
    <div className={`row ${styles.container}`}>
      <div className={'px-4'}>
        <Form.Group controlId="newCR-project-lead">
          <Form.Label className={styles.label}>Project Lead</Form.Label>
          <Form.Control as="select" custom id="newCR-wbs-num" name="projectLeadId" onChange={handleChange} type="number">
            {exampleAllUsers.map((p) => (
              <option key={p.userId} value={p.userId}>{fullNamePipe(p)}</option>
            ))}
          </Form.Control>

          <Form.Label className={styles.label}>Start Date</Form.Label>
          <DatePicker name="startDate" onChange={handleStartDateChange} />
        </Form.Group>
      </div>

      <div className={'px-4'}>
        <Form.Label className={styles.label}>Project Manager</Form.Label>
        <Form.Control as="select" custom id="newCR-project-manager" name="projectManagerId" onChange={handleChange} type="number">
          {exampleAllUsers.map((p) => (
            <option key={p.userId} value={p.userId}>{fullNamePipe(p)}</option>
          ))}
        </Form.Control>
        <Form.Label className={styles.label}>Are the WP details correct?</Form.Label>
        <Form.Group className={'px-4'} controlId="newCR-wp-details">
          {['Yes', 'No'].map((type) => (
            <Row key={type} className="mb-3">
              <Form.Check type="radio" id={type} label={type}  name="confirmDetails" onChange={handleChange} defaultChecked={type === 'No'}/>
            </Row>
          ))}
        </Form.Group>
      </div>
    </div>
  );
};

export default ActivationFormFields;
