/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMutation, useQuery } from 'react-query';
import {
  ChangeRequest,
  ReviewChangeRequestPayload,
  NewChangeRequestPayload,
  CreateActivationChangeRequestPayload
} from 'utils';
import {
  createActivationChangeRequest,
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
        reviewPayload.reviewerId,
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
    ['createCR'],
    async (createPayload: NewChangeRequestPayload) => {
      console.log(createPayload);
      const { data } = await createChangeRequest(
        createPayload.submitterId,
        createPayload.wbsElementId,
        createPayload.type,
        createPayload.payload
      );
      return data;
    }
  );
};

/**
 * Custom React Hook to create an activation change request.
 */
export const useCreateActivationChangeRequest = () => {
  return useMutation<{ message: string }, Error, CreateActivationChangeRequestPayload>(
    ['createActivationCR'],
    async (payload: CreateActivationChangeRequestPayload) => {
      const { data } = await createActivationChangeRequest(
        payload.submitterId,
        payload.wbsNum,
        payload.projectLeadId,
        payload.projectManagerId,
        payload.startDate,
        payload.confirmDetails
      );
      return data;
    }
  );
};
