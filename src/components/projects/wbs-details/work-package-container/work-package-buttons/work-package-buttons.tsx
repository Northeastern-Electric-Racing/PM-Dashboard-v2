/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { EditModeContext, EditModeProps } from '../work-package-container';
import styles from './work-package-buttons.module.css';

const WorkPackageButtons: React.FC<EditModeProps> = (props) => {
  const editMode = useContext(EditModeContext);
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
    </div>
  );
};

export default WorkPackageButtons;
