/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ImplementedChange } from 'utils';
import { fullNamePipe, datePipe } from '../../shared/pipes';
import { routes } from '../../shared/routes';
import BulletList from './bullet-list';

interface ChangesListProps {
  changes: ImplementedChange[];
}

const ChangesList: React.FC<ChangesListProps> = ({ changes }) => {
  return (
    <BulletList
      title={'Changes'}
      list={changes.map((ic) => (
        <>
          [<Link to={`${routes.CHANGE_REQUESTS}/${ic.changeRequestId}`}>#{ic.changeRequestId}</Link>
          ]{' '}
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip">
                {fullNamePipe(ic.implementer)} - {datePipe(ic.dateImplemented)}
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
