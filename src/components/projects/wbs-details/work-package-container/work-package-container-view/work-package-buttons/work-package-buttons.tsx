/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FormContext, EditModeProps } from '../../work-package-container';
import styles from './work-package-buttons.module.css';

interface EditModeProps {
  setEditMode: any;
}

const WorkPackageButtons: React.FC<EditModeProps> = (props) => {
  const { editMode, setField } = useContext(FormContext);
  const history = useHistory();

  return (
    <div className={`mx-4 my-3 ${styles.workPackageActionButtonsContainer}`}>
      <div className={styles.workPackageActionButtonsContainer}>
        <Button type="submit" variant="success">
          Save
        </Button>
        <Button variant="danger" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default WorkPackageButtons;
