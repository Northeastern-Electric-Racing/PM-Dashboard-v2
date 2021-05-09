/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import styles from './description-list.module.css';

interface DescriptionListProps {
  workPackage: WorkPackage;
  className?: string;
}

const DescriptionList: React.FC<DescriptionListProps> = ({
  workPackage,
  className
}: DescriptionListProps) => {
  return (
    <div className={className}>
      <div className={styles.descriptionListBox}>
        <h5>
          <b>Description</b>
        </h5>

        {workPackage.descriptionBullets.map((db) => (
          <li>{db.detail}</li>
        ))}
      </div>
    </div>
  );
};

export default DescriptionList;
