/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button } from 'react-bootstrap';
import styles from './edit-mode-options.module.css';
import { Dispatch, SetStateAction } from 'react';

interface EditModeOptionsProps {
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const EditModeOptions: React.FC<EditModeOptionsProps> = ({ setEditMode }) => {
  return (
    <div className={styles.editModeOptionsContainer}>
      <Button type="submit" variant="success">
        Save
      </Button>
      <Button variant="danger" onClick={() => setEditMode(false)}>
        Cancel
      </Button>
    </div>
  );
};

export default EditModeOptions;
