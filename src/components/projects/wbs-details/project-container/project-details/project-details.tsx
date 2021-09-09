/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { User } from '@prisma/client';
import { Project } from 'utils';
import {
  dollarsPipe,
  endDatePipe,
  fullNamePipe,
  linkPipe,
  wbsPipe,
  weeksPipe
} from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './project-details.module.css';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }: ProjectDetailsProps) => {
  const detailsBody = (
    <>
      <div className={styles.halfDiv}>
        <p>
          <b>Project Name:</b> {project.name}
        </p>
        <p>
          <b>WBS #:</b> {wbsPipe(project.wbsNum)}
        </p>
        <p>
          <b>Project Lead:</b> {fullNamePipe((project.projectLead as unknown) as User)}
        </p>
        <p>
          <b>Project Manager:</b> {fullNamePipe((project.projectManager as unknown) as User)}
        </p>
        <p>
          <b>Budget:</b> {dollarsPipe(project.budget)}
        </p>
        <div className={styles.horizontal}>
          <li>{linkPipe('Slide Deck', project.slideDeckLink)}</li>
          <li>{linkPipe('Task List', project.taskListLink)}</li>
          <li>{linkPipe('BOM', project.bomLink)}</li>
          <li>{linkPipe('Google Drive', project.gDriveLink)}</li>
        </div>
      </div>
      <div className={styles.halfDiv}>
        <p>
          <b>Duration:</b>{' '}
          {weeksPipe(project.workPackages.reduce((tot, cur) => tot + cur.duration, 0))}
        </p>
        <p>
          <b>Start Date:</b>{' '}
          {project.workPackages.length > 0
            ? project.workPackages
                .reduce(
                  (min, cur) => (cur.startDate < min ? cur.startDate : min),
                  project.workPackages[0].startDate
                )
                .toLocaleDateString()
            : 'n/a'}
        </p>
        <p>
          <b>End Date:</b>{' '}
          {project.workPackages.length > 0
            ? endDatePipe(
                project.workPackages.reduce(
                  (min, cur) => (cur.startDate < min ? cur.startDate : min),
                  project.workPackages[0].startDate
                ),
                project.workPackages.reduce((tot, cur) => tot + cur.duration, 0)
              )
            : 'n/a'}
        </p>
        <p>
          <b>Expected Progress:</b>
        </p>
        <p>
          <b>Timeline Status:</b>
        </p>
      </div>
    </>
  );

  return (
    <PageBlock title={'Project Details'} headerRight={<b>{project.status}</b>} body={detailsBody} />
  );
};

export default ProjectDetails;
