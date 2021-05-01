/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { validateWBS, wbsIsProject } from 'utils';
import ProjectContainer from '../../containers/project-container/project-container';
import styles from './wbs-details.module.css';

const WBSDetails: React.FC = () => {
  interface ParamTypes {
    wbsNum: string;
  }
  const { wbsNum } = useParams<ParamTypes>();

  validateWBS(wbsNum); // ensure the provided wbsNum is correctly formatted

  const type: ReactElement = wbsIsProject(wbsNum) ? <ProjectContainer {wbsNum}/> : <workPackageContainer />;
  return (
    <div>
      <h2>This is the WBS Page</h2>
      <p className={styles.describe}>
        {type} {wbsNum}
      </p>
    </div>
  );
};

export default WBSDetails;
