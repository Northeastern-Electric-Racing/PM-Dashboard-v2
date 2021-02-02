import { ChangeRequest } from '../../types/change-request-types';
import './ChangeRequestDetails.module.css';

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
