/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { WorkPackage } from 'utils';
import { routes } from '../../../../../shared/routes';
import { wbsPipe } from '../../../../../shared/pipes';
import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';
import './work-package-dependencies.module.css';

interface WorkPackageDependenciesProps {
  workPackage: WorkPackage;
}

const WorkPackageDependencies: React.FC<WorkPackageDependenciesProps> = ({ workPackage }) => {
  return (
    <HorizontalList
      title={'Dependencies'}
      headerRight={<></>}
      items={workPackage.dependencies.map((ele) => (
        <Link to={`${routes.PROJECTS}/${wbsPipe(ele)}`}>{wbsPipe(ele)}</Link>
      ))}
    />
  );
};

export default WorkPackageDependencies;
