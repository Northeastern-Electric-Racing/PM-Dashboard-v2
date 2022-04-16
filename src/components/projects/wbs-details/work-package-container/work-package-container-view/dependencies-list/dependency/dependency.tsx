/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useContext, createContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { WbsNumber } from 'utils';
import { wbsPipe } from '../../../../../../../shared/pipes';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../../../../../shared/routes';
import styles from './dependency.module.css';

const FormContext = createContext({
  editMode: true,
  setField: (e: string, s: string) => null
});
interface DependencyProps {
  wbsNumber: WbsNumber;
  handleDelete: any;
}

const Dependency: React.FC<DependencyProps> = ({ wbsNumber, handleDelete }) => {
  const { editMode } = useContext(FormContext);
  const history = useHistory();

  function handleLinkClick() {
    history.push(`${routes.PROJECTS}/${wbsPipe(wbsNumber)}`);
  }

  return (
    <div>
      {editMode ? (
        <ButtonGroup>
          <Button variant="outline-danger" onClick={handleLinkClick}>
            {wbsPipe(wbsNumber)}
          </Button>
          <Button variant="danger" onClick={() => handleDelete(wbsNumber)}>
            X
          </Button>
        </ButtonGroup>
      ) : (
        <Button variant="primary" className={styles.dependencyButton} onClick={handleLinkClick}>
          {wbsPipe(wbsNumber)}
        </Button>
      )}
    </div>
  );
};

export default Dependency;
