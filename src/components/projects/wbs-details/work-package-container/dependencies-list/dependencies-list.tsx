/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { WbsNumber } from 'utils';
import { routes } from '../../../../../shared/routes';
import { wbsPipe } from '../../../../../shared/pipes';
import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';
import './dependencies-list.module.css';

interface DependenciesListProps {
  dependencies: WbsNumber[];
}

const DependenciesList: React.FC<DependenciesListProps> = ({ dependencies }) => {
  return (
    <HorizontalList
      title={'Dependencies'}
      headerRight={<></>}
      items={dependencies.map((ele) => (
        <Link to={`${routes.PROJECTS}/${wbsPipe(ele)}`}>{wbsPipe(ele)}</Link>
      ))}
    />
  );
};

export default DependenciesList;
