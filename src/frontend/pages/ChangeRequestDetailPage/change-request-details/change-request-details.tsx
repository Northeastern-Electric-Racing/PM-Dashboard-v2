/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ReactElement, useState } from 'react';
import {
  ActivationChangeRequest,
  ChangeRequest,
  ChangeRequestType,
  StageGateChangeRequest,
  StandardChangeRequest
} from 'utils';
import { datePipe, fullNamePipe, wbsPipe } from '../../../../shared/pipes';
import PageTitle from '../../../layouts/page-title/page-title';
import PageBlock from '../../../layouts/page-block/page-block';
import StandardDetails from './type-specific-details/standard-details/standard-details';
import ActivationDetails from './type-specific-details/activation-details/activation-details';
import StageGateDetails from './type-specific-details/stage-gate-details/stage-gate-details';
import ImplementedChangesList from './implemented-changes-list/implemented-changes-list';
import ReviewNotes from './review-notes/review-notes';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routes } from '../../../../shared/routes';
import ReviewChangeRequest from '../ReviewChangeRequestModal/review-change-request';

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
  isUserAllowedToReview: boolean;
  isUserAllowedToImplement: boolean;
  changeRequest: ChangeRequest;
}

const ChangeRequestDetails: React.FC<ChangeRequestDetailsProps> = ({
  isUserAllowedToReview,
  isUserAllowedToImplement,
  changeRequest
}: ChangeRequestDetailsProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const handleClose = () => setModalShow(false);
  const handleOpen = () => setModalShow(true);

  const reviewBtn = (
    <Button variant="primary" onClick={handleOpen} disabled={!isUserAllowedToReview}>
      Review
    </Button>
  );

  const implementCrDropdown = (
    <DropdownButton id="implement-cr-dropdown" title="Implement Change Request">
      <Dropdown.Item as={Link} to={routes.PROJECTS_NEW} disabled={!isUserAllowedToImplement}>
        Create New Project
      </Dropdown.Item>
      <Dropdown.Item as={Link} to={routes.WORK_PACKAGE_NEW} disabled={!isUserAllowedToImplement}>
        Create New Work Package
      </Dropdown.Item>
    </DropdownButton>
  );

  let actionDropdown = <></>;
  if (changeRequest.accepted === undefined) actionDropdown = reviewBtn;
  if (changeRequest.accepted!) actionDropdown = implementCrDropdown;

  return (
    <>
      <PageTitle title={`Change Request #${changeRequest.crId}`} actionButton={actionDropdown} />
      <PageBlock
        title={'Change Request Details'}
        headerRight={<b>{convertStatus(changeRequest)}</b>}
        body={
          <dl className="row">
            <dt className="col-2">Project / Work Package</dt>
            <dd className="col-auto">
              {
                <Link to={`${routes.PROJECTS}/${wbsPipe(changeRequest.wbsNum)}`}>
                  {wbsPipe(changeRequest.wbsNum)}
                </Link>
              }
            </dd>
            <div className="w-100"></div>
            <dt className="col-2">Type</dt>
            <dd className="col-auto">{changeRequest.type}</dd>
            <div className="w-100"></div>
            <dt className="col-2">Submitted</dt>
            <dd className="col-2">{fullNamePipe(changeRequest.submitter)}</dd>
            <dd className="col-3">{datePipe(changeRequest.dateSubmitted)}</dd>
          </dl>
        }
      />
      {buildDetails(changeRequest)}
      <ReviewNotes
        reviewer={changeRequest.reviewer}
        reviewNotes={changeRequest.reviewNotes}
        dateReviewed={changeRequest.dateReviewed}
      />
      <ImplementedChangesList
        changes={
          changeRequest.implementedChanges === undefined ? [] : changeRequest.implementedChanges
        }
        dateImplemented={changeRequest.dateImplemented!}
      />
      {modalShow && <ReviewChangeRequest modalShow={modalShow} handleClose={handleClose} />}
    </>
  );
};

export default ChangeRequestDetails;
