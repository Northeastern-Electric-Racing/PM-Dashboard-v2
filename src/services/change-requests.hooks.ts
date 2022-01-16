/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMutation, useQuery } from 'react-query';
import { ChangeRequest, ReviewChangeRequestPayload } from 'utils';
import { NewChangeRequestPayload } from 'utils/src';
import {
  createChangeRequest,
  getAllChangeRequests,
  getSingleChangeRequest,
  reviewChangeRequest
} from './change-requests.api';

/**
 * Custom React Hook to supply all change requests.
 */
export const useAllChangeRequests = (onSuccess?: (value: any) => void) => {
  return useQuery<ChangeRequest[], Error>('change requests', async () => {
    if (onSuccess) {
      const { data } = await getAllChangeRequests(onSuccess);
      return data;
    }
    const { data } = await getAllChangeRequests();
    return data;
  });
};

/**
 * Custom React Hook to supply a single change request.
 *
 * @param id Change request ID of the requested change request.
 */
export const useSingleChangeRequest = (id: number) => {
  return useQuery<ChangeRequest, Error>(['change request', id], async () => {
    const { data } = await getSingleChangeRequest(id);
    return data;
  });
};

/**
 * Custom React Hook to review a change request.
 */
export const useReviewChangeRequest = () => {
  return useMutation<{ message: string }, Error, ReviewChangeRequestPayload>(
    ['reviewCR'],
    async (reviewPayload: ReviewChangeRequestPayload) => {
      const { data } = await reviewChangeRequest(
        reviewPayload.crId,
        reviewPayload.accepted,
        reviewPayload.reviewNotes
      );
      return data;
    }
  );
};


/**
 * Custom React Hook to create a change request.
 */
 export const useCreateChangeRequest = () => {
  return useMutation<{ message: string }, Error, NewChangeRequestPayload>(
    ['reviewCR'],
    async (reviewPayload: NewChangeRequestPayload) => {
      console.log(reviewPayload);
      const { data } = await createChangeRequest(
        reviewPayload.submitterId,
        reviewPayload.wbsElementId,
        reviewPayload.type,
        reviewPayload.payload
      );
      return data;
    }
  );
};
