/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import {
  weeksPipe,
  dollarsPipe,
  wbsPipe,
  endDatePipe,
  fullNamePipe
} from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './work-package-details.module.css';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
  const detailsBody = (
    <>
      <div className={styles.halfDiv}>
        <p>
          <b>Work Package Name:</b> {workPackage.name}
        </p>
        <p>
          <b>WBS #:</b> {wbsPipe(workPackage.wbsNum)}
        </p>
        <p>
          <b>Project Lead:</b> {fullNamePipe(workPackage.projectLead)}
        </p>
        <p>
          <b>Project Manager:</b> {fullNamePipe(workPackage.projectManager)}
        </p>
        <p>
          <b>Budget:</b> {dollarsPipe(workPackage.budget)}
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
          <b>Progress:</b> {workPackage.progress}%
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
    <PageBlock
      title={'Work Package Details'}
      headerRight={<b>{workPackage.status}</b>}
      body={detailsBody}
    />
  );
};

export default WorkPackageDetails;
