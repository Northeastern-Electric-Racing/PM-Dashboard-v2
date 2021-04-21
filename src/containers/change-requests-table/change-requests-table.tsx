/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { ChangeRequest } from 'utils';
import { apiFetch } from '../../shared/axios';
import { booleanPipe, fullNamePipe, wbsPipe } from '../../shared/pipes';
import CRTable from '../../components/change-requests-table/change-requests-table'; // Directly rename the default import
import { DisplayChangeRequest } from '../../components/change-requests-table/change-requests-table';
import './change-requests-table.module.css';

const ChangeRequestsTable: React.FC = () => {
  const [allChangeRequests, setAllChangeRequests] = useState<DisplayChangeRequest[]>([]); // store projects data

  // Transforms given change request data and sets local state
  const updateData: (response: AxiosResponse) => void = (res) => {
    setAllChangeRequests(
      res.data.map((cr: ChangeRequest) => {
        return {
          id: cr.id,
          submitterName: fullNamePipe(cr.submitter),
          wbsNum: wbsPipe(cr.wbsNum),
          type: cr.type,
          dateReviewed: cr.dateReviewed ? new Date(cr.dateReviewed).toLocaleDateString() : '',
          accepted: cr.accepted ? booleanPipe(cr.accepted) : '',
          dateImplemented: cr.dateImplemented
            ? new Date(cr.dateImplemented).toLocaleDateString()
            : ''
        };
      })
    );
  };

  // Fetch list of change requests from API on component loading
  useEffect(() => {
    let mounted = true; // indicates component is mounted

    const fetchChangeRequests: Function = async () => {
      apiFetch
        .get('/change-requests')
        .then((response: AxiosResponse) => (mounted ? updateData(response) : ''))
        .catch((error) =>
          mounted ? console.log('fetch change requests error: ' + error.message) : ''
        );
    };
    fetchChangeRequests();

    // cleanup function indicates component has been unmounted
    return () => {
      mounted = false;
    };
  }, []);

  return <CRTable changeRequests={allChangeRequests} />;
};

export default ChangeRequestsTable;
