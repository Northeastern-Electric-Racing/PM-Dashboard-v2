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

interface WorkPackageSummaryProps {
  workPackage: WorkPackage;
}

// Formats the time to the deadline as a string
const getDeadline: Function = (startDate: Date, dur: number): string => {
  var today = new Date("1/15/21");
  var diff = findEndDate(startDate, dur).getTime() - today.getTime();
    
  // To calculate the no. of days between two dates
  var diffDays = Math.floor(diff / (1000 * 3600 * 24));

  if (diffDays < 1) {
    return 0 + " days";

  } else if (diffDays > 7) {

    var diffWeeks = diffDays / 7;

    if (diffWeeks === 1) {
      return diffWeeks + " week";
    } else {
      return diffWeeks + " weeks";
    }

  } else {

    if (diffDays === 1) {
      return diffDays + " day";
    } else {
      return diffDays + " days";
    }
    
  }
};

// Formats the WBS numbers
const formatWbsNum: Function = (wbs: WbsNumber): string => {
  return wbs.area + "." + wbs.project + "." + wbs.workPackage;
};

// Formats the dependencies to be displayed as a list
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

// Formats the rules to be displayed as a list
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

// Formats the end date as a string
const formatEndDate: Function = (startDate: Date, dur: number): string => {
  return findEndDate(startDate, dur).toLocaleDateString();
};

const findEndDate: Function = (startDate: Date, dur: number): Date => {
  var endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + dur*7)
  return endDate;
};

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({
  workPackage
}: WorkPackageSummaryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className={styles.wpCard}>
      <Card.Header className={styles.packageHeader} onClick={() => setOpen(!open)} aria-expanded={open}>
        <div>
          <h5 className={styles.wbsNum}>{formatWbsNum(workPackage.wbsNum)}</h5>
          <h5 className={styles.projectInfo}>{workPackage.name}</h5>
          <h5 className={styles.deadline}>{getDeadline(workPackage.startDate, workPackage.duration)}</h5>
        </div>
      </Card.Header>

      
      <Collapse in={open}>
          <div>
            <Card.Body>
              <p>{workPackage.deliverable}</p>
              <p>Dependencies: {formatDependencies(workPackage.dependencies)}</p>
              <p>Rules: {formatRules(workPackage.rules)}</p>
              <p>Budget: ${workPackage.budget}</p>
              <p>Start date: {workPackage.startDate.toLocaleDateString()}</p>
              <p>End Date: {formatEndDate(workPackage.startDate, workPackage.duration)}</p>
            </Card.Body>
          </div>
      </Collapse>
    </Card>
  );
};

export default WorkPackageSummary;
