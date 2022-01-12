/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ChangeRequest } from 'utils';
import { booleanPipe, fullNamePipe, wbsPipe } from '../../../shared/pipes';
import { useAllChangeRequests } from '../../../services/change-requests.hooks';
import { DisplayChangeRequest } from './change-requests-table/change-requests-table';
import CRTable from './change-requests-table/change-requests-table'; // Directly rename the default import
import ChangeRequestsFilter from './change-requests-filter/change-requests-filter';
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../shared/error-page/error-page';
import { Row } from 'react-bootstrap';
import { useState } from 'react';
import { ChangeRequestExplanation, StandardChangeRequest } from 'utils/src';
import PageTitle from '../../shared/page-title/page-title';
import styles from './change-requests-table.module.css';

/***
 * Returns a list of change requests that has been filtered according to the given params.
 * @param changeRequests The list of projects to filter.
 * @param type The category under which the change request falls.
 * @param impact The parts of the project the change will impact.
 * @param reason The reason the change is needed.
 * @param state The state of review of the CR.
 * @param implemented Whether or not the CR has been implemented.
 * @return The filtered list of change requests.
 */
export function filterCRs(
  changeRequests: ChangeRequest[],
  type: string,
  impact: number[],
  reason: string,
  state: number[],
  implemented: string
): ChangeRequest[] {
  // Type filter
  if (type !== '') {
    changeRequests = changeRequests.filter(
      (changeRequest: ChangeRequest) => changeRequest.type === type
    );
  }

  // Impact Filter
  if (impact.length !== 0) {
    changeRequests = changeRequests.filter((changeRequest: ChangeRequest) => {
      let filterBool = false;
      const standard = changeRequest as StandardChangeRequest;
      console.log(standard);
      if (impact.indexOf(0) !== -1) {
        filterBool =
          filterBool || (standard.scopeImpact !== '' && standard.scopeImpact !== undefined);
      }
      if (impact.indexOf(1) !== -1) {
        filterBool =
          filterBool || (standard.budgetImpact !== 0 && standard.budgetImpact !== undefined);
      }
      if (impact.indexOf(2) !== -1) {
        filterBool =
          filterBool || (standard.timelineImpact !== 0 && standard.timelineImpact !== undefined);
      }
      return filterBool;
    });
  }

  // State filter
  if (state.length !== 0) {
    changeRequests = changeRequests.filter((changeRequest: ChangeRequest) => {
      let filterBool = false;
      if (state.indexOf(0) !== -1) {
        filterBool = filterBool || changeRequest.dateReviewed === undefined;
      }
      if (state.indexOf(1) !== -1) {
        filterBool = filterBool || changeRequest.accepted === true;
      }
      if (state.indexOf(2) !== -1) {
        filterBool = filterBool || changeRequest.accepted === false;
      }
      return filterBool;
    });
  }

  // Reason filter
  if (reason !== '') {
    changeRequests = changeRequests.filter((changeRequest: ChangeRequest) => {
      const standard = changeRequest as StandardChangeRequest;
      if (standard.why === undefined) {
        return false;
      }
      return (
        standard.why.filter((exp: ChangeRequestExplanation) => {
          if (exp.reason === reason) {
            return exp.explain !== '';
          }
          return false;
        }).length !== 0
      );
    });
  }

  // Implemented Filter
  if (implemented !== '') {
    changeRequests = changeRequests.filter(
      (changeRequest: ChangeRequest) =>
        (implemented === 'Yes') === (changeRequest.dateImplemented !== undefined)
    );
  }

  return changeRequests;
}

const ChangeRequestsTable: React.FC = () => {
  const [type, setType] = useState('');
  const [impact, setImpact] = useState<number[]>([]);
  const [reason, setReason] = useState('');
  const [state, setState] = useState<number[]>([]);
  const [implemented, setImplemented] = useState('');
  const { isLoading, isError, data, error } = useAllChangeRequests();

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  const transformToDisplayChangeRequests = (changeRequests: ChangeRequest[]) => {
    return changeRequests.map((cr: ChangeRequest) => {
      return {
        id: cr.id,
        submitterName: fullNamePipe(cr.submitter),
        wbsNum: wbsPipe(cr.wbsNum),
        type: cr.type,
        dateReviewed: cr.dateReviewed ? new Date(cr.dateReviewed).toLocaleDateString() : '',
        accepted: cr.accepted ? booleanPipe(cr.accepted) : '',
        dateImplemented: cr.dateImplemented ? new Date(cr.dateImplemented).toLocaleDateString() : ''
      };
    }) as DisplayChangeRequest[];
  };

  const sendDataToParent = (
    type: string,
    impact: number[],
    reason: string,
    state: number[],
    implemented: string
  ) => {
    setType(type);
    setImpact(impact);
    setReason(reason);
    setState(state);
    setImplemented(implemented);
  };

  const changeRequestsTable = () => {
    return (
      <CRTable
        changeRequests={transformToDisplayChangeRequests(
          filterCRs(data!, type, impact, reason, state, implemented)
        )}
      />
    );
  };

  const changeRequestsContainer = () => {
    return (
      <>
        <PageTitle title={'Change Requests'} />
        <div className={styles.container}>
          <Row>
            <div className={styles.filterTable}>
              <ChangeRequestsFilter update={sendDataToParent} />
            </div>
            <div className={styles.crTable}>{changeRequestsTable()}</div>
          </Row>
        </div>
      </>
    );
  };

  return changeRequestsContainer();
};

export default ChangeRequestsTable;
