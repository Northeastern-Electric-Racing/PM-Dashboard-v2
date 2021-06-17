/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { ChangeRequest } from 'utils';
import { booleanPipe, fullNamePipe, wbsPipe } from '../../../shared/pipes';
import { useAllChangeRequests } from '../../../services/change-requests.hooks';
import { DisplayChangeRequest } from './change-requests-table/change-requests-table';
import CRTable from './change-requests-table/change-requests-table'; // Directly rename the default import
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import './change-requests-table.module.css';

const ChangeRequestsTable: React.FC = () => {
  const { isLoading, isError, data, error } = useAllChangeRequests();

  if (isLoading) return <LoadingIndicator />;

  if (isError) {
    return (
      <>
        <h3>Oops, sorry!</h3>
        <h5>There was an error loading the page.</h5>
        <p>{error ? error.message : 'There was an error loading the data.'}</p>
      </>
    );
  }

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

  return <CRTable changeRequests={transformToDisplayChangeRequests(data!)} />;
};

export default ChangeRequestsTable;
