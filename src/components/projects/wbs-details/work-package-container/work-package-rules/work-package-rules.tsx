/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import styles from './work-package-rules.module.css';

interface WorkPackageRulesProps {
  workPackage: WorkPackage;
  className?: string;
}

const WorkPackageRules: React.FC<WorkPackageRulesProps> = ({
  workPackage,
  className
}: WorkPackageRulesProps) => {
  return (
    <div className={className}>
      <div className={styles.wpRulesBox}>
        <h5>
          <b>Rules</b>
        </h5>
        {workPackage.rules.map((str, idx) => (
          <p key={idx} className={styles.ruleReferences}>
            {str}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WorkPackageRules;
