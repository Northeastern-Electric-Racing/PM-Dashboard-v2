/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useParams } from 'react-router-dom';
import { validateWBS, wbsIsProject } from 'utils';
import WorkPackageContainer from '../../containers/work-package-container/work-package-container';
import styles from './wbs-details.module.css';

const WBSDetails: React.FC = () => {
  interface ParamTypes {
    wbsNum: string;
  }
  const { wbsNum } = useParams<ParamTypes>();

  validateWBS(wbsNum); // ensure the provided wbsNum is correctly formatted

  const type: string = wbsIsProject(wbsNum) ? 'Project' : 'Work Package';
  return (
    <div>
      <WorkPackageContainer wbsNum={{ car: 1, project: 1, workPackage: 1 }} />
    </div>
  );
};

export default WBSDetails;
