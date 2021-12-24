import { EditModeProps } from '../work-package-container';
import { Button } from 'react-bootstrap';
import styles from './edit-mode-options.module.css';

const EditModeOptions: React.FC<EditModeProps> = (props) => {
  return (
    <div className={styles.editModeOptionsContainer}>
      <Button>Save</Button>
      <Button onClick={props.changeEditMode}>Cancel</Button>
    </div>
  );
};

export default EditModeOptions;
