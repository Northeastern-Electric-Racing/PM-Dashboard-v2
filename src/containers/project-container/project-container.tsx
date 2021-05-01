/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { apiFetch } from '../../shared/axios';
import { exampleProject4, Project, WorkPackage, apiRoutes } from 'utils';
import ProjectDetails from '../../components/project-details/project-details';
import WorkPackageSummary from '../../components/work-package-summary/work-package-summary';
import './project-container.module.css';
import { wbsPipe } from '../../shared/pipes';
import { WbsNumber } from 'utils/src';

interface ProjectContainerProps {
  wbsNum: WbsNumber;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ wbsNum }: ProjectContainerProps) => {
  const [project, setProject] = useState<Project>(exampleProject4); // store projects data

  useEffect(() => {
    let mounted = true; // indicates component is mounted

    const fetchProjects: Function = async () => {
      apiFetch
        .get(apiRoutes.PROJECTS + `/` + wbsPipe(wbsNum))
        .then((response: AxiosResponse) =>
          mounted ? /* Should update project here*/ console.log(response.data) : ''
        )
        .catch((error) => (mounted ? console.log('fetch project error: ' + error.message) : ''));
    };
    fetchProjects();

    // cleanup function indicates component has been unmounted
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <ProjectDetails project={project} />

      {project.workPackages.map((ele: WorkPackage) => (
        <WorkPackageSummary key={wbsPipe(ele.wbsNum)} workPackage={ele} />
      ))}
    </div>
  );
};

export default ProjectContainer;
