/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { DisplayProject } from '../../containers/projects-table/projects-table';
import { linkPipe } from '../../shared/pipes';
import styles from './project-details.module.css';

interface ProjectDetailsProps {
  displayProject: DisplayProject
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ displayProject }: ProjectDetailsProps) => {
  return (
    <div id={styles['project-details']} className="item-box">
      <header>Project Details</header>
      <p>
        Project Name: <span className={styles.important}>{displayProject.name}</span>
        WBS# <span className={styles.important}>{displayProject.wbsNum}</span>
      </p>
      <p>
        Project Lead: <span className={styles.important}>{displayProject.projectLead}</span>
        Project Manager: <span className={styles.important}>{displayProject.projectManager}</span>
      </p>
      <p>
        Duration: <span className={styles.important}>{displayProject.duration}</span>
      </p>
      <menu>
        <li>
          {linkPipe('Slide Deck', displayProject.project.slideDeckLink)}
        </li>
        <li>
          {linkPipe('Task List', displayProject.project.taskListLink)}
        </li>
        <li>
          {linkPipe('Google Drive', displayProject.project.gDriveLink)}
        </li>
      </menu>
    </div>
  );
};

export default ProjectDetails;
