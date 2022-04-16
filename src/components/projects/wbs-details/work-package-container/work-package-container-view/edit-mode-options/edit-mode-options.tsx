/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { EditModeContext } from '../../work-package-container';
import styles from './edit-mode-options.module.css';

const EditModeOptions: React.FC = () => {
  const { setEditMode } = useContext(EditModeContext);
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
