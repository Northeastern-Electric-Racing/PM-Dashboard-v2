/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import styles from './work-package-summary.module.css';
import {
  WbsNumber,
  WorkPackage
} from 'utils';

interface WorkPackageSummaryProps {
  workPackage: WorkPackage;
}

const buildDependecies: Function = (wp: WorkPackage): ReactElement => {
  return (
    <>
      {wp.dependencies.map((dep: WbsNumber) => (<>{dep.area}.{dep.project}.{dep.workPackage} </>))}
    </>
  );
};

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({
  workPackage
}: WorkPackageSummaryProps) => {

  return (
    <div>
      <p>{workPackage.deliverable}</p>

      <p>Dependencies: {buildDependecies(workPackage)}</p>

      <p>Rules: {workPackage.rules.map((rule: string) => (<>{rule} </>))}</p>
      <p>Budget: ${workPackage.budget}</p>
      <p>Start date: {workPackage.startDate.toLocaleDateString()}</p>
      <p>End Date: {workPackage.startDate.toLocaleDateString()}</p>
    </div>
  );
};

export default WorkPackageSummary;
