/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import PageBlock from '../../../../shared/page-block/page-block';
import styles from './project-rules.module.css';

interface RulesProps {
  rules: string[];
}

const ProjectRules: React.FC<RulesProps> = ({ rules }) => {
  const list = rules.map((str, idx) => (
    <p key={idx} className={styles.ruleReferences}>
      {str}
    </p>
  ));
  return <PageBlock title={'Rules'} headerRight={<></>} body={<>{list}</>} />;
};

export default ProjectRules;
