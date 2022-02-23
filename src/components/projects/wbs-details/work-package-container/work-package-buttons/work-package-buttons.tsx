/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FormContext, EditModeProps } from '../work-package-container';
import styles from './work-package-buttons.module.css';

const WorkPackageButtons: React.FC<EditModeProps> = (props) => {
  const { editMode, setField } = useContext(FormContext);
  const history = useHistory();

  return (
    <div className={`mx-4 my-3 ${styles.workPackageActionButtonsContainer}`}>
      <Button
        className={styles.workPackageActionButton}
        onClick={() => {
          history.push('/change-requests/new');
        }}
      >
        New Change Request
      </Button>
      <Button
        className={styles.workPackageActionButton}
        style={{ alignSelf: 'flex-end' }}
        onClick={props.changeEditMode}
        disabled={editMode}
      >
        Edit
      </Button>
      {editMode ? (
        <Form.Control
          required
          className="w-25"
          type="number"
          placeholder="Change Request ID #"
          onChange={(e) => setField('changeRequestID', e.target.value)}
          min={0}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default WorkPackageButtons;
