/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import styles from './work-package-summary.module.css';
import { Card, Collapse } from 'react-bootstrap';
import { WorkPackage } from 'utils';
import {
  weeksPipe,
  dollarsPipe,
  linkPipe,
  wbsPipe,
  endDatePipe,
  listPipe
} from '../../shared/pipes';

interface WorkPackageSummaryProps {
  workPackage: WorkPackage;
  className?: string;
}

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({
  workPackage,
  className
}: WorkPackageSummaryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className={className}>
      <Card.Header className={styles.header} onClick={() => setOpen(!open)} aria-expanded={open}>
        <div>
          <h5 className={styles.wbsNum}>{wbsPipe(workPackage.wbsNum)}</h5>
          <h5 className={styles.projectInfo}>{linkPipe(workPackage.name, '/projects')}</h5>
          <h5 className={styles.duration}>{weeksPipe(workPackage.duration)}</h5>
        </div>
      </Card.Header>

      <Collapse in={open}>
        <div>
          <Card.Body>
            <p>{workPackage.deliverable}</p>
            <div className={styles.halfDiv}>
              <p>
                <b>Dependencies:</b> {listPipe(workPackage.dependencies, wbsPipe)}
              </p>
              <p>
                <b>Rules:</b> {listPipe(workPackage.rules, (str: string): string => str)}
              </p>
              <p>
                <b>Budget:</b> {dollarsPipe(workPackage.budget)}
              </p>
            </div>
            <div className={styles.halfDiv}>
              <p>
                <b>Start date:</b> {workPackage.startDate.toLocaleDateString()}
              </p>
              <p>
                <b>End Date:</b> {endDatePipe(workPackage.startDate, workPackage.duration)}
              </p>
            </div>
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};

export default WorkPackageSummary;
