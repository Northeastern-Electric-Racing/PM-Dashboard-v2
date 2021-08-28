/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, Row } from 'react-bootstrap';
import { exampleAllWorkPackages } from '../../../../../test-support/test-data/work-packages.stub';
import { exampleAllProjects } from '../../../../../test-support/test-data/projects.stub';
import { fullNamePipe } from '../../../../../shared/pipes';
import styles from './activation-form-fields.module.css'
import DatePicker from 'react-date-picker';

const ActivationFormFields: React.FC = () => {
  return (
    <Form>
      <div className={`${'row'} ${styles.container}`}>
        <div className={'px-4'}>
          <Form.Group controlId="newCR-project-lead">
            <Form.Label className={styles.label}>Project Lead</Form.Label>
            <Form.Control as="select" custom
              id="newCR-wbs-num">
              {exampleAllWorkPackages.map((p) => (
                <option key={p.id}>{fullNamePipe(p.projectLead)}</option>
              ))}
            </Form.Control>

            <Form.Label className={styles.label}>Start Date</Form.Label>
            <DatePicker />
          </Form.Group>
        </div>

        <div className={'px-4'}>
          <Form.Label className={styles.label}>Project Manager</Form.Label>
          <Form.Control as="select" custom
            id="newCR-project-manager">
            {exampleAllProjects.map((p) => (
              <option key={p.id}>{fullNamePipe(p.projectManager)}</option>
            ))}
          </Form.Control>
          <Form.Label className={styles.label}>Are the WP details correct?</Form.Label>
          <Form.Group className={'px-4'} controlId="newCR-wp-details">
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



export default ActivationFormFields;
