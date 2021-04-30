/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import { linkPipe, wbsPipe } from '../../shared/pipes';
import './project-details.module.css';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  return (
    <div>
      <p>
        Project Details Component: {wbsPipe(project.wbsNum)} - {project.name} in{' '}
        {linkPipe(project.gDriveLink)}
      </p>
    </div>
  );
};

export default ProjectDetails;
