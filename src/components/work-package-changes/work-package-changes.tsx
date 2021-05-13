/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import styles from './work-package-changes.module.css';

interface WorkPackageChangesProps {
  workPackage: WorkPackage;
}

const WorkPackageChanges: React.FC<WorkPackageChangesProps> = ({
  workPackage
}: WorkPackageChangesProps) => {
  return (
    <div className={styles.wpChangesBox}>
      <h5>
        <b>Changes</b>
      </h5>
      <ol>
        {workPackage.changes.map((ic, idx) => {
          return (
            <li key={idx}>
              [#{ic.crId}] {ic.detail}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default WorkPackageChanges;
