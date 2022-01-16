/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { CR_Type } from '@prisma/client';
import axios from 'axios';
import { NewStandardChangeRequestPayload } from 'utils';
import { ChangeRequest } from 'utils';
import { NewActivationChangeRequestPayload, NewStageRequestChangeRequestPayload } from 'utils/src';
import { apiUrls } from '../shared/urls';
import { changeRequestTransformer } from './transformers/change-requests.transformers';

/**
 * Fetches all change requests.
 */
export const getAllChangeRequests = (onSuccess?: (value: any) => void) => {
  const changeRequests = axios.get<ChangeRequest[]>(apiUrls.changeRequests(), {
    transformResponse: (data) => JSON.parse(data).map(changeRequestTransformer)
  });

  if (onSuccess) {
    changeRequests.then(response => {
      onSuccess!(response);
    });
  }

  return changeRequests;
};

/**
 * Fetches a single change request.
 *
 * @param id Change request ID of the requested change request.
 */
export const getSingleChangeRequest = (id: number) => {
  return axios.get<ChangeRequest>(apiUrls.changeRequestsById(`${id}`), {
    transformResponse: (data) => changeRequestTransformer(JSON.parse(data))
  });
};

/**
 * Review a change request.
 *
 * @param crId The ID of the change request being reviewed.
 * @param accepted Is the change request being accepted?
 * @param reviewNotes The notes attached to reviewing the change request.
 */
export const reviewChangeRequest = (crId: number, accepted: boolean, reviewNotes: string) => {
  return axios.post<{ message: string }>(apiUrls.changeRequestsReview(), {
    crId,
    accepted,
    reviewNotes
  });
};


/**
 * Create a change request.
 *
 * @param submitterId The ID of the change request being reviewed.
 * @param wbsElementId Is the change request being accepted?
 * @param type The notes attached to reviewing the change request.
 * @param payload
 * 
 * TODO
 */
 export const createChangeRequest = (
    submitterId: number, 
    wbsElementId: number, 
    type: CR_Type,
    payload: NewStandardChangeRequestPayload | NewActivationChangeRequestPayload | NewStageRequestChangeRequestPayload) => {
  return axios.post<{ message: string }>(apiUrls.changeRequestsCreate(), {
    submitterId,
    wbsElementId,
    type,
    payload
  });
};