/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { apiFetch } from '../../shared/axios';
import { Project, WorkPackage, apiRoutes } from 'utils';
import ProjectDetails from '../../components/project-details/project-details';
import WorkPackageSummary from '../../components/work-package-summary/work-package-summary';
import styles from './project-container.module.css';
import { wbsPipe } from '../../shared/pipes';
import { WbsNumber } from 'utils/src';

interface ProjectContainerProps {
  wbsNum: WbsNumber;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ wbsNum }: ProjectContainerProps) => {
  const [project, setProject] = useState<Project>(); // store projects data

  useEffect(() => {
    let mounted = true; // indicates component is mounted

    // Transforms given project data and sets local state
    const updateData: Function = (response: AxiosResponse) => {
      console.log(response.data);

      const proj: Project = {
        ...response.data,
        dateCreated: new Date(response.data.dateCreated),
        workPackages: response.data.workPackages.map((ele: WorkPackage) => {
          return {
            ...ele,
            startDate: new Date(ele.startDate)
          };
        })
      };
      setProject(proj);
    };

    const fetchProjects: Function = async () => {
      apiFetch
        .get(apiRoutes.PROJECTS + `/` + wbsPipe(wbsNum))
        .then((response: AxiosResponse) =>
          mounted ? /* Should update project here*/ updateData(response) : ''
        )
        .catch((error) => (mounted ? console.log('fetch project error: ' + error.message) : ''));
    };
    fetchProjects();

    // cleanup function indicates component has been unmounted
    return () => {
      mounted = false;
    };
  });

  if (project === undefined) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.projectContainer}>
      <h2>
        {wbsPipe(project!.wbsNum)} - {project!.name}
      </h2>
      <hr />
      <ProjectDetails project={project!} />
      <div className={`${styles.projectContainerBox} ${styles.workPackageList}`}>
        <h4>Work Packages</h4>
        <hr />
        {project!.workPackages.map((ele: WorkPackage) => (
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
