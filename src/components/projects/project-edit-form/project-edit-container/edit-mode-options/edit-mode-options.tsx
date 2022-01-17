/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { EditModeProps } from '../project-edit-container';
import { Button } from 'react-bootstrap';
import styles from './edit-mode-options.module.css';

const EditModeOptions: React.FC<EditModeProps> = (props) => {
  return (
    <div className={styles.editModeOptionsContainer}>
      <Button variant="success">Save</Button>
      <Button variant="danger" onClick={props.changeEditMode}>
        Cancel
      </Button>
    </div>
  );
};

export default EditModeOptions;
