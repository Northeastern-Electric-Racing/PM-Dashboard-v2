/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import CheckList from '../../../../components/check-list/check-list';

interface RiskLogProps {
  risks: { details: string; resolved: boolean }[];
}

const RiskLog: React.FC<RiskLogProps> = ({ risks }) => {
  return <CheckList title="Risk Log" list={risks} />;
};

export default RiskLog;
