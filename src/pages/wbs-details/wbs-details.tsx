/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { validateWBS, wbsIsProject, WbsNumber } from 'utils';
import ProjectContainer from '../../containers/project-container/project-container';
import { wbsPipe } from '../../shared/pipes';
import styles from './wbs-details.module.css';

const WBSDetails: React.FC = () => {
  interface ParamTypes {
    wbsNum: string;
  }
  const { wbsNum } = useParams<ParamTypes>();

  const wbsAsObj: WbsNumber = validateWBS(wbsNum); // ensure the provided wbsNum is correctly formatted

  const type: ReactElement = wbsIsProject(wbsNum) ? (
    <ProjectContainer wbsNum={wbsAsObj} />
  ) : (
    <p>Work Package: {wbsPipe(wbsAsObj)}</p>
  );
  return <p className={styles.describe}>{type}</p>;
};

export default WBSDetails;
