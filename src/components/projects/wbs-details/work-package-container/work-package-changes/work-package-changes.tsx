/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { WorkPackage } from 'utils';
import { routes } from '../../../../../shared/routes';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './work-package-changes.module.css';

interface WorkPackageChangesProps {
  workPackage: WorkPackage;
}

const WorkPackageChanges: React.FC<WorkPackageChangesProps> = ({ workPackage }) => {
  const list = workPackage.changes.map((ic, idx) => (
    <li key={idx}>
      [<Link to={`${routes.CHANGE_REQUESTS}/${ic.crId}`}>#{ic.crId}</Link>] {ic.detail}
    </li>
  ));
  return (
    <PageBlock
      title={'Changes'}
      headerRight={<></>}
      body={<ol className={styles.bulletList}>{list}</ol>}
    />
  );
};

export default WorkPackageChanges;
