/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import styles from './project-details.module.css';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  return (
    <div id={styles.project_details}>
      <header>Project Details</header>
      <p>
        Project Name: <span className={styles.important}>{project.name}</span>
        WBS# <span className={styles.important}>{project.wbsNum}</span>
      </p>
      <p>
        Project Lead: <span className={styles.important}>{project.projectLead}</span>
        Project Manager: <span className={styles.important}>{project.projectManager}</span>
      </p>
      <p>
        Duration: <span className={styles.important}>{project.duration}</span>
      </p>
      <menu>
        <li>
          <a href="">Slide Deck</a>
        </li>
        <li>
          <a href="">Task List</a>
        </li>
        <li>
          <a href="">Google Drive</a>
        </li>
      </menu>
    </div>
  );
};

export default ProjectDetails;
