/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */


import styles from './work-package-summary.module.css';
import {
  WorkPackage
} from 'utils';

interface WorkPackageSummaryProps {
  workPackage: WorkPackage;
}

const WorkPackageSummary: React.FC<WorkPackageSummaryProps> = ({
  workPackage
}: WorkPackageSummaryProps) => {
  return (
    <h4 className={styles.title}>{workPackage.name}</h4>
  );
};

export default WorkPackageSummary;
