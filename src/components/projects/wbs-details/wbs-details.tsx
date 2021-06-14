/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useParams } from 'react-router-dom';
import { validateWBS, isProject } from 'utils';
import ProjectContainer from './project-container/project-container';
import WorkPackageContainer from './work-package-container/work-package-container';
import './wbs-details.module.css';

const WBSDetails: React.FC = () => {
  interface ParamTypes {
    wbsNum: string;
  }
  const { wbsNum } = useParams<ParamTypes>();
  let wbsNumber;
  try {
    wbsNumber = validateWBS(wbsNum); // ensure the provided wbsNum is correctly formatted
  } catch (error) {
    return (
      <>
        <h3>Oops, sorry!</h3>
        <h5>There was an error loading the page.</h5>
        <p>{error.message ? error.message : 'The wbsNumber did not parse properly.'}</p>
      </>
    );
  }

  if (isProject(wbsNumber)) {
    return <ProjectContainer wbsNum={wbsNumber} />;
  }
  return <WorkPackageContainer wbsNum={wbsNumber} />;
};

export default WBSDetails;
