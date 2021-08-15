/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';
import './rules-list.module.css';

interface RulesProps {
  rules: string[];
}

const ProjectRules: React.FC<RulesProps> = ({ rules }) => {
  return (
    <HorizontalList
      title={'Rules'}
      headerRight={<></>}
      items={rules.map((r) => (
        <>{r}</>
      ))}
    />
  );
};

export default ProjectRules;
