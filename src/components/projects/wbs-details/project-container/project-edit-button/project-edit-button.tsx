/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Dispatch, SetStateAction } from 'react';
import { Button } from 'react-bootstrap';
import styles from './project-edit-button.module.css';

interface ProjectEditButtonProps {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  allowEdit: boolean;
}

const ProjectEditButton: React.FC<ProjectEditButtonProps> = ({ setEditMode, allowEdit }) => {
  return (
    <div className={`mx-4 my-3 ${styles.projectActionButtonsContainer}`}>
      <Button
        className={styles.projectActionButton}
        style={{ alignSelf: 'flex-end' }}
        onClick={() => setEditMode(true)}
        disabled={!allowEdit}
      >
        Edit
      </Button>
    </div>
  );
};

export default ProjectEditButton;
