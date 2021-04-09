/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils/src/types/project-types';
import { linkPipe } from '../../shared/pipes';
import styles from './project-details.module.css';

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
      </p>
      <p>
        Project Lead: <span className={styles.important}>{project.projectLead}</span>
        Project Manager: <span className={styles.important}>{project.projectManager}</span>
      </p>
      <p>
        Duration: <span className={styles.important}></span>
      </p>
      <menu>
        <li>
          {linkPipe('Slide Deck', project.slideDeckLink)}
        </li>
        <li>
          {linkPipe('Task List', project.taskListLink)}
        </li>
        <li>
          {linkPipe('Google Drive', project.gDriveLink)}
        </li>
      </menu>
    </div>
  );
};

export default ProjectDetails;
