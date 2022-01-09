/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { ImplementedChange } from 'utils';
import { wbsPipe } from '../../../../../shared/pipes';
import { routes } from '../../../../../shared/routes';
import BulletList from '../../../../shared/bullet-list/bullet-list';
import './implemented-changes-list.module.css';

interface ImplementedChangesListProps {
  changes: ImplementedChange[];
}

const ImplementedChangesList: React.FC<ImplementedChangesListProps> = ({ changes }) => {
  return (
    <BulletList
      title={'Implemented Changes'}
      headerRight={<></>}
      list={changes.map((ic) => (
        <>
          [<Link to={`${routes.PROJECTS}/${wbsPipe(ic.wbsNum)}`}>{wbsPipe(ic.wbsNum)}</Link>]{' '}
          {ic.detail}
        </>
      ))}
    />
  );
};

export default ImplementedChangesList;
