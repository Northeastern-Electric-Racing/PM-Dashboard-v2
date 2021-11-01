/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Collapse } from 'react-bootstrap';
import { WorkPackageSummary as WorkPackageSum } from 'utils';
import { weeksPipe, wbsPipe, endDatePipe, listPipe } from '../../../../../shared/pipes';
import { routes } from '../../../../../shared/routes';
import styles from './work-package-summary.module.css';

interface WorkPackageSummaryProps {
  workPackage: WorkPackageSum;
}

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({ workPackage }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <Card.Header className={styles.header} onClick={() => setOpen(!open)} aria-expanded={open}>
        <div>
          <p className={styles.wbsNum}>{wbsPipe(workPackage.wbsNum)}</p>
          <p className={styles.name}>
            <Link to={`${routes.PROJECTS}/${wbsPipe(workPackage.wbsNum)}`}>{workPackage.name}</Link>
          </p>
          <p className={styles.duration}>{weeksPipe(workPackage.duration)}</p>
        </div>
      </Card.Header>

      <Collapse in={open}>
        <div>
          <Card.Body>
            <div className={styles.halfDiv}>
              <p>
                <b>Dependencies:</b> {listPipe(workPackage.dependencies, wbsPipe)}
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
