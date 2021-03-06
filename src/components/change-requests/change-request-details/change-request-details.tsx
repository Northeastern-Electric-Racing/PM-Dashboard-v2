/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useParams } from 'react-router-dom';
import { useSingleChangeRequest } from '../../../services/change-requests.hooks';
import ChangeRequestDetailsView from './change-request-details/change-request-details';
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../shared/error-page/error-page';
import './change-request-details.module.css';

const ChangeRequestDetails: React.FC = () => {
  interface ParamTypes {
    id: string;
  }
  const { id } = useParams<ParamTypes>();
  const { isLoading, isError, data, error } = useSingleChangeRequest(parseInt(id));

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return <ChangeRequestDetailsView changeRequest={data!} />;
};

export default ChangeRequestDetails;
