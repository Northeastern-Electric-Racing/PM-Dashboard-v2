/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage, WbsNumber } from 'utils';
import { wbsPipe } from '../../../../shared/pipes';
import { useSingleProject } from '../../../../services/projects.hooks';
import ProjectDetails from './project-details/project-details';
import WorkPackageSummary from './work-package-summary/work-package-summary';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import PageTitle from '../../../shared/page-title/page-title';
import styles from './project-container.module.css';

interface ProjectContainerProps {
  wbsNum: WbsNumber;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ wbsNum }: ProjectContainerProps) => {
  const { isLoading, isError, data, error } = useSingleProject(wbsNum);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <div className={styles.projectContainer}>
      <PageTitle title={`${wbsPipe(wbsNum)} - ${data!.name}`} />
      <hr />
      <div className={styles.projectContainerBox}>
        <ProjectDetails project={data!} />
      </div>
      <div className={`${styles.projectContainerBox} ${styles.workPackageList}`}>
        <h4>Work Packages</h4>
        <hr />
        {data!.workPackages.map((ele: WorkPackage) => (
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
