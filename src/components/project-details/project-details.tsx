/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from '../../utils/src';
import { linkPipe } from '../../shared/pipes';
import styles from '*.module.css';

interface ProjectDetailsProps {
  project: Project
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  return (
    <div id={styles['project-details']} className="item-box">
      <header>Project Details</header>
      <p>
        Project Name: <span className={styles.important}>{project.name}</span>
        WBS# <span className={styles.important}>{project.wbsNum}</span>
        Project Details Component: {project.wbsNum} - {project.name} in{' '}
        {linkPipe(project.gDriveLink)}
      </p>
      <p>
        Project Lead: <span className={styles.important}>{project.projectLead}</span>
        Project Manager: <span className={styles.important}>{project.projectManager}</span>
      </p>
      <p>
        Date Created: <span className={styles.important}>{project.dateCreated}</span>
      </p>
      <menu>
        <li>
          <a href="">Slide Deck</a>
        </li>
        <li>
          <a href="">Task List</a>
        </li>
        <li>
          <a href={project.gDriveLink}>Google Drive</a>
        </li>
      </menu>
    </div>
  );
};

export default ProjectDetails;
