/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import styles from './work-package-details.module.css';
import { WorkPackage } from 'utils';
import {
  weeksPipe,
  dollarsPipe,
  linkPipe,
  wbsPipe,
  endDatePipe,
  listPipe,
  fullNamePipe
} from '../../shared/pipes';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
  className?: string;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({
  workPackage,
  className
}: WorkPackageDetailsProps) => {
  return (
    <div className={className}>
      <div className={styles.WPDetailsBox}>
        <div className={styles.header}>
          <h5 className={styles.title}>
            <b>Work Package Details</b>
          </h5>
          <h5 className={styles.wbsNum}>WBS #{wbsPipe(workPackage.wbsNum)}</h5>
        </div>
        <div className={styles.halfDiv}>
          <p>
            <b>Work Package Name:</b> {workPackage.name}
          </p>
          <p>
            <b>Project Name:</b> ???
          </p>
          <p>
            <b>Project Lead:</b> {fullNamePipe(workPackage.projectLead)}
          </p>
          <p>
            <b>Project Manager:</b> {fullNamePipe(workPackage.projectManager)}
          </p>
          <p>
            <b>Deliverables:</b> {workPackage.deliverable}
          </p>
        </div>
        <div className={styles.halfDiv}>
          <p>
            <b>Duration:</b> {weeksPipe(workPackage.duration)}
          </p>
          <p>
            <b>Start Date:</b> {workPackage.startDate.toLocaleDateString()}
          </p>
          <p>
            <b>End Date:</b> {endDatePipe(workPackage.startDate, workPackage.duration)}
          </p>
          <p>
            <b>Budget:</b> {dollarsPipe(workPackage.budget)}
          </p>
          <p>
            <b>Progress:</b> {workPackage.progress}% ----
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkPackageDetails;
