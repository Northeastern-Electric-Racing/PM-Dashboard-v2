/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ChangeRequest, exampleStandardChangeRequest } from 'utils';
import { apiFetch } from '../../shared/axios';
import ChangeRequestDetailsView from '../../components/change-request-details/change-request-details';
import './change-request-details.module.css';

const ChangeRequestDetails: React.FC = () => {
  interface ParamTypes {
    id: string;
  }
  const { id } = useParams<ParamTypes>();
  const [changeRequest, setChangeRequest] = useState<ChangeRequest>(exampleStandardChangeRequest); // store projects data

  // Transforms given project data and sets local state
  const updateData: (response: AxiosResponse) => void = (res) => {
    setChangeRequest({
      ...res.data,
      dateSubmitted: new Date(res.data.dateSubmitted),
      dateReviewed: new Date(res.data.dateReviewed),
      dateImplemented: new Date(res.data.dateImplemented)
    });
  };

  // Fetch change request from API on component loading
  useEffect(() => {
    let mounted = true; // indicates component is mounted

    const fetchChangeRequest = async () => {
      apiFetch
        .get(`/change-requests/${id}`)
        .then((response: AxiosResponse) => (mounted ? updateData(response) : ''))
        .catch((error) =>
          mounted ? console.log('fetch change request error: ' + error.message) : ''
        );
    };
    fetchChangeRequest();

    // cleanup function indicates component has been unmounted
    return () => {
      mounted = false;
    };
  }, [id]);

  return <ChangeRequestDetailsView changeRequest={changeRequest} />;
};

export default ChangeRequestDetails;
