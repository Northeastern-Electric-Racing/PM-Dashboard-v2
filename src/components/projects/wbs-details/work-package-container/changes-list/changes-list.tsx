/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { ImplementedChange } from 'utils/src';
import { routes } from '../../../../../shared/routes';
import BulletList from '../../../../shared/bullet-list/bullet-list';
import './changes-list.module.css';

interface ChangesListProps {
  changes: ImplementedChange[];
}

const ChangesList: React.FC<ChangesListProps> = ({ changes }) => {
  return (
    <BulletList
      title={'Changes'}
      headerRight={<></>}
      list={changes.map((ic) => (
        <>
          [<Link to={`${routes.CHANGE_REQUESTS}/${ic.crId}`}>#{ic.crId}</Link>] {ic.detail}
        </>
      ))}
    />
  );
};

export default ChangesList;
