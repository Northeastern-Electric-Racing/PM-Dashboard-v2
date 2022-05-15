/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button } from 'react-bootstrap';
import styles from './work-package-buttons.module.css';

interface EditModeProps {
  setEditMode: any;
  allowEdit: boolean;
}

const WorkPackageButtons: React.FC<EditModeProps> = ({ setEditMode, allowEdit }) => {
  return (
    <div className={`mx-4 my-3 ${styles.workPackageActionButtonsContainer}`}>
      <Button
        className={styles.workPackageActionButton}
        style={{ alignSelf: 'flex-end' }}
        onClick={() => setEditMode(true)}
        disabled={!allowEdit}
      >
        Edit
      </Button>
    </div>
  );
};

export default WorkPackageButtons;
