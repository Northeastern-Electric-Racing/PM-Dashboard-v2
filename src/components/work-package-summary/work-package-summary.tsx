/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import { useState } from 'react';
import styles from './work-package-summary.module.css';
import { Card,Collapse } from "react-bootstrap";
import {
  WbsNumber,
  WorkPackage
} from 'utils';

interface WorkPackageSummaryProps {
  workPackage: WorkPackage;
}

const getDeadline: Function = (dur: number): string => {
  if(dur == 1) {
    return dur + " week";
  } else {
    return dur + " weeks";
  }
};

const getWbsNum: Function = (wbs: WbsNumber): string => {
  return wbs.area + "." + wbs.project + "." + wbs.workPackage;
};

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({
  workPackage
}: WorkPackageSummaryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className={styles.wpCard}>
      <Card.Header className={styles.packageHeader}
        onClick={() => setOpen(!open)}
        aria-expanded={open}>
        <div>
          <h4 className={styles.wbsNum}>{getWbsNum(workPackage.wbs)}</h4>
          <h4 className={styles.projectInfo}>{workPackage.name}</h4>
          <h4 className={styles.deadline}>{getDeadline(workPackage.duration)}</h4>
        </div>
      </Card.Header>

      <Collapse in={open}>
        <Card.Body>
            <div>
              <p>{workPackage.deliverable}</p>

              <p>Dependencies: {workPackage.dependencies.map((dep: WbsNumber) => (<>{dep.area}.{dep.project}.{dep.workPackage} </>))}</p>

              <p>Rules: {workPackage.rules.map((rule: string) => (<>{rule} </>))}</p>
              <p>Budget: ${workPackage.budget}</p>
              <p>Start date: {workPackage.startDate.toLocaleDateString()}</p>
              <p>End Date: {workPackage.startDate.toLocaleDateString()}</p>
            </div>
        </Card.Body>
      </Collapse>
    </Card>
  );
};

export default WorkPackageSummary;
