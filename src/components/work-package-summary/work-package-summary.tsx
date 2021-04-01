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
  if(dur === 1) {
    return dur + " week";
  } else {
    return dur + " weeks";
  }
};

const formatWbsNum: Function = (wbs: WbsNumber): string => {
  return wbs.area + "." + wbs.project + "." + wbs.workPackage;
};

const formatDependencies: Function = (dep: WbsNumber[]): string => {
  var i = 0;
  var str = "";
  if (dep.length === 0) {
    return str;
  }
  for (i = 0; i < dep.length - 1; i++) {
    str = str  + formatWbsNum(dep[i]) + ", ";
  }
  return str + formatWbsNum(dep[i]);
};

const formatRules: Function = (rules: string[]): string => {
  var i = 0;
  var str = "";
  if (rules.length === 0) {
    return str;
  }
  for (i = 0; i < rules.length - 1; i++) {
    str = str  + rules[i] + ", ";
  }
  return str + rules[i];
};

const formatEndDate: Function = (startDate: Date, dur: number): string => {
  return startDate.toLocaleDateString();
};

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({
  workPackage
}: WorkPackageSummaryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className={styles.wpCard}>
      <Card.Header className={styles.packageHeader} onClick={() => setOpen(!open)} aria-expanded={open}>
        <div>
          <h4 className={styles.wbsNum}>{formatWbsNum(workPackage.wbsNum)}</h4>
          <h4 className={styles.projectInfo}>{workPackage.name}</h4>
          <h4 className={styles.deadline}>{getDeadline(workPackage.duration)}</h4>
        </div>
      </Card.Header>

      <Collapse in={open}>
        <Card.Body>
            <div>
              <p>{workPackage.deliverable}</p>
              <p>Dependencies: {formatDependencies(workPackage.dependencies)}</p>
              <p>Rules: {formatRules(workPackage.rules)}</p>
              <p>Budget: ${workPackage.budget}</p>
              <p>Start date: {workPackage.startDate.toLocaleDateString()}</p>
              <p>End Date: {formatEndDate(workPackage.startDate, workPackage.duration)}</p>
            </div>
        </Card.Body>
      </Collapse>
    </Card>
  );
};

export default WorkPackageSummary;
