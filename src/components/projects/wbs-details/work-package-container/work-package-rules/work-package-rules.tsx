/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils';
import PageBlock from '../../../../shared/page-block/page-block';
import styles from './work-package-rules.module.css';

interface WorkPackageRulesProps {
  workPackage: WorkPackage;
}

const WorkPackageRules: React.FC<WorkPackageRulesProps> = ({ workPackage }) => {
  const list = workPackage.rules.map((str, idx) => (
    <p key={idx} className={styles.ruleReferences}>
      {str}
    </p>
  ));
  return <PageBlock title={'Rules'} headerRight={<></>} body={<>{list}</>} />;
};

export default WorkPackageRules;
