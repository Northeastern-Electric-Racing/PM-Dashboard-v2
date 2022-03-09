/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { datePipe, fullNamePipe, wbsPipe } from '../../../../../shared/pipes';
import { ImplementedChange } from 'utils';
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
          [<Link to={`${routes.PROJECTS}/${wbsPipe(ic.wbsNum)}`}>{wbsPipe(ic.wbsNum)}</Link>]{' '}
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip">
                {fullNamePipe(ic.implementer)} - {ic.dateImplemented}
              </Tooltip>
            }
          >
            <span>{ic.detail}</span>
          </OverlayTrigger>
        </>
      ))}
      readOnly={true}
    />
  );
};

export default ChangesList;
