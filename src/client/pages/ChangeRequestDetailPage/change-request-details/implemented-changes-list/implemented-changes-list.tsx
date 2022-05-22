/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ImplementedChange } from 'utils';
import { datePipe, fullNamePipe, wbsPipe } from '../../../../../shared/pipes';
import { routes } from '../../../../../shared/routes';
import BulletList from '../../../../components/bullet-list/bullet-list';
import './implemented-changes-list.module.css';

interface ImplementedChangesListProps {
  changes: ImplementedChange[];
  dateImplemented: Date;
}

const ImplementedChangesList: React.FC<ImplementedChangesListProps> = ({
  changes,
  dateImplemented
}) => {
  return (
    <BulletList
      title={'Implemented Changes'}
      headerRight={<></>}
      list={changes.map((ic) => (
        <>
          [<Link to={`${routes.PROJECTS}/${wbsPipe(ic.wbsNum)}`}>{wbsPipe(ic.wbsNum)}</Link>]{' '}
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip">
                {fullNamePipe(ic.implementer)} - {datePipe(dateImplemented)}
              </Tooltip>
            }
          >
            <span>{ic.detail}</span>
          </OverlayTrigger>
        </>
      ))}
    />
  );
};

export default ImplementedChangesList;
