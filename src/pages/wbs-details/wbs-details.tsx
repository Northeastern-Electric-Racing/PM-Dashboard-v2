/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useLocation, useParams } from 'react-router-dom';
import { validateWBS, wbsIsProject } from 'utils';
import ProjectDetails from '../../components/project-details/project-details';
import { DisplayProject } from '../../containers/projects-table/projects-table';
import styles from './wbs-details.module.css';

const WBSDetails: React.FC = () => {
  interface ParamTypes {
    wbsNum: string;
  }
  const displayProject = useLocation<DisplayProject>().state;
  const { wbsNum } = useParams<ParamTypes>();

  validateWBS(wbsNum); // ensure the provided wbsNum is correctly formatted

  const type: string = wbsIsProject(wbsNum) ? 'Project' : 'Work Package';
  return (
    <div>
      <h2>This is the WBS Page</h2>
      <p className={styles.describe}>
        {type} {wbsNum}
      </p>
      <ProjectDetails displayProject={displayProject} />
    </div>
  );
};

export default WBSDetails;
