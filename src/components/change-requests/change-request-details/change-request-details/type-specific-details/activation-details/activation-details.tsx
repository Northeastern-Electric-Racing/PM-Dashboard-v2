/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ActivationChangeRequest } from 'utils';
import { booleanPipe, datePipe, fullNamePipe } from '../../../../../../shared/pipes';
import PageBlock from '../../../../../shared/page-block/page-block';

interface ActivationDetailsProps {
  cr: ActivationChangeRequest;
}

const ActivationDetails: React.FC<ActivationDetailsProps> = ({ cr }: ActivationDetailsProps) => {
  return (
    <PageBlock
      title={'Activation Change Request Details'}
      headerRight={<></>}
      body={
        <dl className="row">
          <dt className="col-2">Project Lead</dt>
          <dd className="col-3">{fullNamePipe(cr.projectLead)}</dd>
          <div className="w-100"></div>
          <dt className="col-2">Project Manager</dt>
          <dd className="col-3">{fullNamePipe(cr.projectManager)}</dd>
          <div className="w-100"></div>
          <dt className="col-2">Start Date</dt>
          <dd className="col-3">{datePipe(cr.startDate)}</dd>
          <div className="w-100"></div>
          <dt className="col-2">Confirm WP Details</dt>
          <dd className="col-3">{booleanPipe(cr.confirmDetails)}</dd>
        </dl>
      }
    />
  );
};

export default ActivationDetails;
