/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import styles from './description-list.module.css';

interface DescriptionListProps {
  workPackage: WorkPackage;
}

const DescriptionList: React.FC<DescriptionListProps> = ({ workPackage }: DescriptionListProps) => {
  return (
    <div className={styles.descriptionListBox}>
      <h5>
        <b>Description</b>
      </h5>

      {workPackage.descriptionBullets.map((bullet, idx) => (
        <li key={idx}>{bullet.detail}</li>
      ))}
    </div>
  );
};

export default DescriptionList;
