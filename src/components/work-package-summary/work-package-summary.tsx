/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import styles from './work-package-summary.module.css';
import { Card,Collapse } from "react-bootstrap";
import {
  WbsNumber,
  WorkPackage
} from 'utils';
import { weeksPipe, dollarsPipe, linkPipe, wbsPipe } from '../../shared/pipes';

interface WorkPackageSummaryProps {
  workPackage: WorkPackage;
}

// Formats an array of objects into a string that is a list
export const formatList: Function = <T, >(rules: T[], app: (el: T) => string): string => {
  var i = 0;
  var str = "";
  if (rules.length === 0) {
    return str;
  }
  for (i = 0; i < rules.length - 1; i++) {
    str = str  + app(rules[i])+ ", ";
  }
  return str + app(rules[i]);
};

// Formats the end date as a string
export const formatEndDate: Function = (startDate: Date, dur: number): string => {
  var endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + dur*7)
  return endDate.toLocaleDateString();
};

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({
  workPackage
}: WorkPackageSummaryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className={styles.wpCard}>
      <Card.Header className={styles.packageHeader} onClick={() => setOpen(!open)} aria-expanded={open}>
        <div>
          <h5 className={styles.wbsNum}>{wbsPipe(workPackage.wbsNum)}</h5>
          <h5 className={styles.projectInfo}>{linkPipe(workPackage.name, '/projects')}</h5>
          <h5 className={styles.deadline}>{weeksPipe(workPackage.duration)}</h5>
        </div>
      </Card.Header>

      
      <Collapse in={open}>
          <div>
            <Card.Body>
              <p>{workPackage.deliverable}</p>
              <div className={styles.halfDiv}>
                <p><b>Dependencies:</b> {formatList(workPackage.dependencies, wbsPipe)}</p>
                <p><b>Rules:</b> {formatList(workPackage.rules, (str: string): string => { return str; })}</p>
                <p><b>Budget:</b> {dollarsPipe(workPackage.budget)}</p>
              </div>
              <div className={styles.halfDiv}>
                <p><b>Start date:</b> {workPackage.startDate.toLocaleDateString()}</p>
                <p><b>End Date:</b> {formatEndDate(workPackage.startDate, workPackage.duration)}</p>
              </div>
            </Card.Body>
          </div>
      </Collapse>
    </Card>
  );
};

export default WorkPackageSummary;
