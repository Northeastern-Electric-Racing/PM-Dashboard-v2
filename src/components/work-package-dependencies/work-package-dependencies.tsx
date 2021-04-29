/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WbsNumber, WorkPackage } from 'utils';
import { wbsPipe, linkPipe } from '../../shared/pipes';
import styles from './work-package-dependencies.module.css';

interface WorkPackageDependenciesProps {
  workPackage: WorkPackage;
  className?: string;
}

const WorkPackageDependencies: React.FC<WorkPackageDependenciesProps> = ({
  workPackage,
  className
}: WorkPackageDependenciesProps) => {
  return (
    <div className={className}>
      <div className={styles.wpDepBox}>
        <div className={styles.header}>
          <h5>
            <b>Dependencies</b>
          </h5>
        </div>
        <div>
          {workPackage.dependencies.map((ele: WbsNumber, idx: number) => (
            <p key={wbsPipe(ele)} className={styles.wbsNum}>
              {linkPipe(wbsPipe(ele), `/projects/${wbsPipe(workPackage.wbsNum)}`)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPackageDependencies;
