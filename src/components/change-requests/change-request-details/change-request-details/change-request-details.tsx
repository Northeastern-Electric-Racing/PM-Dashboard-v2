/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement } from 'react';
import {
  ChangeRequest,
  StandardChangeRequest,
  ActivationChangeRequest,
  StageGateChangeRequest,
  ChangeRequestType
} from 'utils';
import { fullNamePipe } from '../../../../shared/pipes';
import PageTitle from '../../../shared/page-title/page-title';
import PageBlock from '../../../shared/page-block/page-block';
import StandardDetails from './type-specific-details/standard-details/standard-details';
import ActivationDetails from './type-specific-details/activation-details/activation-details';
import StageGateDetails from './type-specific-details/stage-gate-details/stage-gate-details';
import ImplementedChangesList from './implemented-changes-list/implemented-changes-list';
import './change-request-details.module.css';
import ReviewNotes from './review-notes/review-notes';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const convertStatus = (cr: ChangeRequest): string => {
  if (cr.dateImplemented) {
    return 'Implemented';
  }
  if (cr.dateReviewed && cr.accepted) {
    return 'Accepted';
  }
  if (cr.dateReviewed && !cr.accepted) {
    return 'Denied';
  }
  return 'Open';
};

const buildDetails = (cr: ChangeRequest): ReactElement => {
  switch (cr.type) {
    case ChangeRequestType.Activation:
      return <ActivationDetails cr={cr as ActivationChangeRequest} />;
    case ChangeRequestType.StageGate:
      return <StageGateDetails cr={cr as StageGateChangeRequest} />;
    default:
      return <StandardDetails cr={cr as StandardChangeRequest} />;
  }
};

interface ChangeRequestDetailsProps {
  changeRequest: ChangeRequest;
}

const ChangeRequestDetails: React.FC<ChangeRequestDetailsProps> = ({
  changeRequest
}: ChangeRequestDetailsProps) => {
  const reviewDropdown = (
    <DropdownButton id="review-dropdown" title="Review">
      <Dropdown.Item as={Link} to={`/change-requests/${changeRequest.crId}/accept`}>Accept</Dropdown.Item>
      <Dropdown.Item as={Link} to={`/change-requests/${changeRequest.crId}/deny`}>Deny</Dropdown.Item>
    </DropdownButton>
  );

  const implementCrDropdown = (
    <DropdownButton id="implement-cr-dropdown" title="Implement Change Request">
      <Dropdown.Item as={Link} to="/projects/new">Create New Project</Dropdown.Item>
    </DropdownButton>
  );

  return (
    <>
      <PageTitle
        title={`Change Request #${changeRequest.crId}`}
        actionButton={changeRequest.accepted !== undefined ? (changeRequest.accepted! ? implementCrDropdown : <></>) : reviewDropdown}
      />
      <PageBlock
        title={'Change Request Details'}
        headerRight={<b>{convertStatus(changeRequest)}</b>}
        body={
          <dl className="row">
            <dt className="col-2">Submitted</dt>
            <dd className="col-2">{fullNamePipe(changeRequest.submitter)}</dd>
            <dd className="col-3">{changeRequest.dateSubmitted.toUTCString()}</dd>
            <div className="w-100"></div>
            <dt className="col-2">Type</dt>
            <dd className="col-auto">{changeRequest.type}</dd>
            <div className="w-100"></div>
          </dl>
        }
      />
      {buildDetails(changeRequest)}
      <ReviewNotes reviewer={changeRequest.reviewer} reviewNotes={changeRequest.reviewNotes} />
      <ImplementedChangesList
        changes={
          changeRequest.implementedChanges === undefined ? [] : changeRequest.implementedChanges
        }
        dateImplemented={changeRequest.dateImplemented!}
      />
    </>
  );
};

export default ChangeRequestDetails;
