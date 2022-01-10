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
  ChangeRequestType,
  ChangeRequestExplanation
} from 'utils';
import { weeksPipe, dollarsPipe, fullNamePipe, booleanPipe } from '../../../../shared/pipes';
import PageTitle from '../../../shared/page-title/page-title';
import PageBlock from '../../../shared/page-block/page-block';
import styles from './change-request-details.module.css';
import ActionButton from '../../../shared/action-button/action-button';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

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

const buildChangeRequestDetails = (cr: StandardChangeRequest): ReactElement => {
  return (
    <PageBlock
      title={'Standard Change Request Details'}
      headerRight={<></>}
      body={
        <dl className="row">
          <dt className="col-2">What</dt>
          <dd className="col-auto">{cr.what}</dd>
          <div className="w-100"></div>
          <dt className="col-2">Why</dt>
          <dd className="col">
            <dl>
              {cr.why.map((ele: ChangeRequestExplanation, idx: number) => (
                <div key={idx} className="row w-100">
                  <dt className="col-3">{ele.reason}</dt>
                  <dd className="col">{ele.explain}</dd>
                </div>
              ))}
            </dl>
          </dd>
          <div className="w-100"></div>
          <dt className="col-2">Impact</dt>
          <dd className="col-auto">
            <dl className="row">
              <dt className="col-3">Scope Impact</dt>
              <dd className="col-auto">{cr.scopeImpact}</dd>
              <div className="w-100"></div>
              <dt className="col-3">Timeline Impact</dt>
              <dd className="col-auto">{weeksPipe(cr.timelineImpact)}</dd>
              <div className="w-100"></div>
              <dt className="col-3">Budget Impact</dt>
              <dd className="col-auto">{dollarsPipe(cr.budgetImpact)}</dd>
            </dl>
          </dd>
        </dl>
      }
    />
  );
};

const buildActivationChangeRequestDetails = (cr: ActivationChangeRequest): ReactElement => {
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
          <dd className="col-3">{cr.startDate.toUTCString()}</dd>
          <div className="w-100"></div>
          <dt className="col-2">Confirm WP Details</dt>
          <dd className="col-3">{booleanPipe(cr.confirmDetails)}</dd>
        </dl>
      }
    />
  );
};

const buildStageGateChangeRequestDetails = (cr: StageGateChangeRequest): ReactElement => {
  return (
    <PageBlock
      title={'Stage Gate Change Request Details'}
      headerRight={<></>}
      body={
        <dl className="row">
          <dt className="col-4">Confirm WP Completed</dt>
          <dd className="col">{booleanPipe(cr.confirmDone)}</dd>
          <div className="w-100"></div>
          <dt className="col-4">Leftover Budget</dt>
          <dd className="col">{dollarsPipe(cr.leftoverBudget)}</dd>
        </dl>
      }
    />
  );
};

const buildDetails = (cr: ChangeRequest): ReactElement => {
  if (cr.type === ChangeRequestType.Activation) {
    return buildActivationChangeRequestDetails(cr as ActivationChangeRequest);
  }
  if (cr.type === ChangeRequestType.StageGate) {
    return buildStageGateChangeRequestDetails(cr as StageGateChangeRequest);
  }
  return buildChangeRequestDetails(cr as StandardChangeRequest);
};

interface ChangeRequestDetailsProps {
  changeRequest: ChangeRequest;
}

const ChangeRequestDetails: React.FC<ChangeRequestDetailsProps> = ({
  changeRequest
}: ChangeRequestDetailsProps) => {
  const reviewBtns = (
    <div className={styles.btnsContainer}>
      <ActionButton
        link={`/change-requests/${changeRequest.crId}/accept`}
        icon={faThumbsUp}
        text="Accept"
      />
      <ActionButton
        link={`/change-requests/${changeRequest.crId}/deny`}
        icon={faThumbsDown}
        text="Deny"
      />
    </div>
  );

  return (
    <>
      <PageTitle title={`Change Request #${changeRequest.crId}`} actionButton={reviewBtns} />

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
      <PageBlock title={'Implemented Changes'} headerRight={<></>} body={<>list of changes</>} />
    </>
  );
};

export default ChangeRequestDetails;
