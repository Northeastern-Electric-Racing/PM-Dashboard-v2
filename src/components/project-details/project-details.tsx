/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from '../../types/project-types';
import './project-details.module.css';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  return (
    <div>
      <p>
        Project Details Component: {project.name} with {project.duration} weeks
      </p>
    </div>
  );
};

export default ProjectDetails;
