/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../../services/auth.hooks';
import { useReviewChangeRequest } from '../../../services/change-requests.hooks';
import { routes } from '../../../shared/routes';
import ErrorPage from '../../shared/error-page/error-page';
import LoadingIndicator from '../../shared/loading-indicator/loading-indicator';
import ReviewChangeRequestsView from './review-change-request/review-change-request';

interface ReviewChangeRequestProps {
  option: 'Accept' | 'Deny';
}

const ReviewChangeRequest: React.FC<ReviewChangeRequestProps> = ({
  option
}: ReviewChangeRequestProps) => {
  interface ParamTypes {
    id: string;
  }
  const { id } = useParams<ParamTypes>();
  const crId = parseInt(id);
  const auth = useAuth();
  const history = useHistory();
  const [reviewNotes, setReviewNotes] = useState('');
  const { isLoading, isError, error, mutateAsync } = useReviewChangeRequest();

  const backToChangeRequestPage = () => history.push(`${routes.CHANGE_REQUESTS}/${crId}`);

  const handleConfirm = async (e: any) => {
    e.preventDefault();
    if (auth.user?.userId === undefined)
      throw new Error('Cannot review change request without being logged in');
    await mutateAsync({
      reviewerId: auth.user?.userId,
      crId,
      reviewNotes,
      accepted: option === 'Accept'
    });
    backToChangeRequestPage();
  };

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorPage message={error?.message} />;

  return (
    <ReviewChangeRequestsView
      crId={crId}
      option={option}
      setReviewNotes={setReviewNotes}
      onSubmit={handleConfirm}
      onCancel={backToChangeRequestPage}
    />
  );
};

export default ReviewChangeRequest;
