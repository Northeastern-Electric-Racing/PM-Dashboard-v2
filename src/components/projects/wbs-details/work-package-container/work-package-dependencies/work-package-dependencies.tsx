/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { WorkPackage } from 'utils';
import { routes } from '../../../../../shared/routes';
import { wbsPipe } from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './work-package-dependencies.module.css';

interface WorkPackageDependenciesProps {
  workPackage: WorkPackage;
}

const WorkPackageDependencies: React.FC<WorkPackageDependenciesProps> = ({ workPackage }) => {
  const list = workPackage.dependencies.map((ele) => (
    <p key={wbsPipe(ele)} className={styles.wbsNum}>
      <Link to={`${routes.PROJECTS}/${wbsPipe(ele)}`}>{wbsPipe(ele)}</Link>
    </p>
  ));
  return <PageBlock title={'Dependencies'} headerRight={<></>} body={<>{list}</>} />;
};

export default WorkPackageDependencies;
