/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FormContext } from '../../work-package-container';
import { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { WbsNumber } from 'utils';
import { wbsPipe } from '../../../../../../shared/pipes';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../../../../shared/routes';
import styles from './dependency.module.css';

interface DependencyProps {
  wbsNumber: WbsNumber;
}

const Dependency: React.FC<DependencyProps> = ({ wbsNumber }) => {
  const { editMode } = useContext(FormContext);
  const history = useHistory();

  function handleLinkClick() {
    history.push(`${routes.PROJECTS}/${wbsPipe(wbsNumber)}`);
  }

  return (
    <div>
      {editMode ? (
        <ButtonGroup>
          <Button variant="outline-primary" onClick={handleLinkClick}>
            {wbsPipe(wbsNumber)}
          </Button>
          <Button variant="danger">X</Button>
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
