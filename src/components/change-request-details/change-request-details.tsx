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
  ChangeRequestExplanation,
  User
} from 'utils';
import { weeksPipe, dollarsPipe, linkPipe, fullNamePipe, booleanPipe } from '../../shared/pipes';
import styles from './change-request-details.module.css';

const convertStatus: Function = (cr: ChangeRequest): string => {
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

const buildChangeRequestDetails: Function = (cr: StandardChangeRequest): ReactElement => {
  return (
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
  );
};

const buildActivationChangeRequestDetails: Function = (
  cr: ActivationChangeRequest
): ReactElement => {
  return (
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
  );
};

const buildStageGateChangeRequestDetails: Function = (cr: StageGateChangeRequest): ReactElement => {
  return (
    <dl className="row">
      <dt className="col-4">Confirm WP Completed</dt>
      <dd className="col">{booleanPipe(cr.confirmCompleted)}</dd>
      <div className="w-100"></div>
      <dt className="col-4">Leftover Budget</dt>
      <dd className="col">{dollarsPipe(cr.leftoverBudget)}</dd>
    </dl>
  );
};

const buildDetails: Function = (cr: ChangeRequest): ReactElement => {
  if (cr.type === ChangeRequestType.Activation) {
    return buildActivationChangeRequestDetails(cr);
  }
  if (cr.type === ChangeRequestType.StageGate) {
    return buildStageGateChangeRequestDetails(cr);
  }
  return buildChangeRequestDetails(cr);
};

interface ChangeRequestDetailsProps {
  changeRequest: ChangeRequest;
}

const ChangeRequestDetails: React.FC<ChangeRequestDetailsProps> = ({
  changeRequest
}: ChangeRequestDetailsProps) => {
  return (
    <div className={`mx-auto ${styles.boundingBox}`}>
      <h4 className={styles.title}>Change Request #{changeRequest.id}</h4>
      <div className="container">
        <dl className="row">
          <dt className="col-2">Submitted</dt>
          <dd className="col-2">{fullNamePipe(changeRequest.submitter)}</dd>
          <dd className="col-3">{changeRequest.dateSubmitted.toUTCString()}</dd>
        </dl>
        <hr className={styles.divider} />
        <dl className="row">
          <dt className="col-2">Type</dt>
          <dd className="col-auto">{changeRequest.type}</dd>
          <div className="w-100"></div>
          <dt className="col-2">Status</dt>
          <dd className="col-auto">{convertStatus(changeRequest)}</dd>
        </dl>
        <hr className={styles.divider} />
        <div>{buildDetails(changeRequest)}</div>
        <hr className={styles.divider} />
        <dl className="row">
          <dt className="col-2">Changes</dt>
          <dd className="col-auto">list of changes</dd>
        </dl>
      </div>
    </div>
  );
};

export default ChangeRequestDetails;
