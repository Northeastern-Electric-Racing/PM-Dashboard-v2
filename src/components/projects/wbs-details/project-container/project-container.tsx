/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage, WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import ProjectDetails from './project-details/project-details';
import WorkPackageSummary from './work-package-summary/work-package-summary';
import styles from './project-container.module.css';
import { useSingleProject } from '../../../../services/projects';

interface ProjectContainerProps {
  wbsNum: WbsNumber;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ wbsNum }: ProjectContainerProps) => {
  const { isLoading, errorMessage, responseData } = useSingleProject(wbsNum);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (errorMessage !== '' || responseData === undefined) {
    return (
      <>
        <h3>Oops, sorry!</h3>
        <h5>There was an error loading the page.</h5>
        <p>{errorMessage ? errorMessage : 'The data did not load properly.'}</p>
      </>
    );
  }
  return (
    <div className={styles.projectContainer}>
      <h2>
        {wbsPipe(responseData!.wbsNum)} - {responseData!.name}
      </h2>
      <hr />
      <div className={styles.projectContainerBox}>
        <ProjectDetails project={responseData!} />
      </div>
      <div className={`${styles.projectContainerBox} ${styles.workPackageList}`}>
        <h4>Work Packages</h4>
        <hr />
        {responseData!.workPackages.map((ele: WorkPackage) => (
          <WorkPackageSummary
            className={styles.workPackageSummary}
            key={wbsPipe(ele.wbsNum)}
            workPackage={ele}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectContainer;
