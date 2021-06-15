/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { WbsNumber, WorkPackage } from 'utils';
import { wbsPipe } from '../../shared/pipes';
import styles from './work-package-dependencies.module.css';

interface WorkPackageDependenciesProps {
  workPackage: WorkPackage;
  className?: string;
}

const WorkPackageDependencies: React.FC<WorkPackageDependenciesProps> = ({
  workPackage,
  className
}: WorkPackageDependenciesProps) => {
  const linkString: string = `/projects/${wbsPipe(workPackage.wbsNum)}`;
  return (
    <div className={className}>
      <div className={styles.wpDepBox}>
        <div className={styles.header}>
          <h5>
            <b>Dependencies</b>
          </h5>
        </div>
        <div>
          {workPackage.dependencies.map((ele: WbsNumber) => (
            <p key={wbsPipe(ele)} className={styles.wbsNum}>
              <Link to={linkString}>{wbsPipe(ele)}</Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPackageDependencies;