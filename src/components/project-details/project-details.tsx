import { Project } from '../../types/project-types';
import './ProjectDetails.module.css';

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
