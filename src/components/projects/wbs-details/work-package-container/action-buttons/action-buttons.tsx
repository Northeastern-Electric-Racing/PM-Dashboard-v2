import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { EditModeContext, EditModeProps } from '../work-package-container';
import styles from './action-buttons.module.css';

const ActionButtons: React.FC<EditModeProps> = (props) => {
  const editMode = useContext(EditModeContext);
  return (
    <div className={`mx-4 my-3 ${styles.workPackageActionButtonsContainer}`}>
      <Button className={styles.workPackageActionButton}>New Change Request</Button>
      <Button className={styles.workPackageActionButton}>Stage Gate</Button>
      <Button className={styles.workPackageActionButton}>Update Progress</Button>
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

export default ActionButtons;
