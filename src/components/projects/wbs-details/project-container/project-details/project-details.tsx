/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Project } from 'utils';
import { fullNamePipe, linkPipe, wbsPipe, weeksPipe } from '../../../../../shared/pipes';
import styles from './project-details.module.css';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  const wbsNum = wbsPipe(project.wbsNum);
  const projectLead = fullNamePipe(project.projectLead);
  const projectManager = fullNamePipe(project.projectManager);
  // duration of the project in weeks
  // TODO: fix the function below
  const duration = weeksPipe(7);

  return (
    <div className="item-box">
      <div className={styles.horizontal}>
        <h4>Project Details</h4>
        <p className={styles.status}>{project.status}</p>
      </div>
      <div className={styles.horizontal}>
        Project Name: <p>{project.name}</p>
        WBS# <p>{wbsNum}</p>
      </div>
      <div className={styles.horizontal}>
        Project Lead: <p>{projectLead}</p>
        Project Manager: <p>{projectManager}</p>
      </div>
      <div className={styles.horizontal}>
        Duration: <p>{duration}</p>
      </div>
      <div className={styles.horizontal}>
        <li>{linkPipe('Slide Deck', project.slideDeckLink)}</li>
        <li>{linkPipe('Task List', project.taskListLink)}</li>
        <li>{linkPipe('BOM', project.bomLink)}</li>
        <li>{linkPipe('Google Drive', project.gDriveLink)}</li>
      </div>
    </div>
  );
};

export default ProjectDetails;
