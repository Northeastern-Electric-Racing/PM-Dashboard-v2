/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './description-list.module.css';

interface DescriptionListProps {
  workPackage: WorkPackage;
}

const DescriptionList: React.FC<DescriptionListProps> = ({ workPackage }) => {
  const list = workPackage.descriptionBullets.map((bullet, idx) => (
    <li key={idx}>{bullet.detail}</li>
  ));
  return (
    <PageBlock
      title={'Description'}
      headerRight={<></>}
      body={<ul className={styles.bulletList}>{list}</ul>}
    />
  );
};

export default DescriptionList;
