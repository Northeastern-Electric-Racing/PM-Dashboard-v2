/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ChangeRequest } from 'utils';
import './change-request-details.module.css';

interface ChangeRequestDetailsProps {
  changeRequest: ChangeRequest;
}

const ChangeRequestDetails: React.FC<ChangeRequestDetailsProps> = ({
  changeRequest
}: ChangeRequestDetailsProps) => {
  return (
    <div>
      <p>
        Change Request Details Component:
        {changeRequest.submitter} submitted a {changeRequest.type} change request.
      </p>
    </div>
  );
};

export default ChangeRequestDetails;
