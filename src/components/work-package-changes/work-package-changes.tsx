/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage, ImplementedChange } from 'utils';
import styles from './work-package-changes.module.css';

interface WorkPackageChangesProps {
  workPackage: WorkPackage;
  className?: string;
}

const WorkPackageChanges: React.FC<WorkPackageChangesProps> = ({
  workPackage,
  className
}: WorkPackageChangesProps) => {
  const implementedChangeToP = (ic: ImplementedChange, idx: number) => {
    return (
      <p>
        {idx + 1}. [#{ic.crId}] {ic.detail}
      </p>
    );
  };

  return (
    <div className={className}>
      <div className={styles.wpChangesBox}>
        <h5>
          <b>Changes</b>
        </h5>
        {workPackage.changes.map(implementedChangeToP)}
      </div>
    </div>
  );
};

export default WorkPackageChanges;
