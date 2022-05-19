/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { CR_Type } from '@prisma/client';
import axios from 'axios';
import { ChangeRequest, NewStandardChangeRequestPayload, WbsNumber } from 'utils';
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
    changeRequests.then((response) => {
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
 * @param reviewerId The ID of the user reviewing the change request.
 * @param crId The ID of the change request being reviewed.
 * @param accepted Is the change request being accepted?
 * @param reviewNotes The notes attached to reviewing the change request.
 */
export const reviewChangeRequest = (
  reviewerId: number,
  crId: number,
  accepted: boolean,
  reviewNotes: string
) => {
  return axios.post<{ message: string }>(apiUrls.changeRequestsReview(), {
    reviewerId,
    crId,
    accepted,
    reviewNotes
  });
};

/**
 * Create a change request.
 *
 * @param submitterId The ID of the user creating the change request.
 * @param wbsElementId the ID of the WBS element the change request is for.
 * @param type The notes attached to reviewing the change request.
 * @param payload The payload of the change request.
 *
 * TODO
 */
export const createChangeRequest = (
  submitterId: number,
  wbsElementId: number,
  type: CR_Type,
  payload: NewStandardChangeRequestPayload
) => {
  return axios.post<{ message: string }>(apiUrls.changeRequestsCreate(), {
    submitterId,
    wbsElementId,
    type,
    payload
  });
};

/**
 * Create an activation change request.
 * @param submitterId The ID of the user creating the change request.
 * @param wbsNumber the wbsNumber of the WBS element the change request is for.
 * @param projectLeadId the ID of the project lead intended to be assigned to the WBS element being activated.
 * @param projectManagerId the ID of the project manager intended to be assigned to the WBS element being activated.
 * @param startDate the intended start date of the WBS element being activated.
 * @param confirmDetails are the details of the WBS element being activated fully confirmed?
 */
export const createActivationChangeRequest = (
  submitterId: number,
  wbsNum: WbsNumber,
  projectLeadId: number,
  projectManagerId: number,
  startDate: string,
  confirmDetails: boolean
) => {
  return axios.post<{ message: string }>(apiUrls.changeRequestsCreateActivation(), {
    submitterId,
    wbsNum,
    type: CR_Type.ACTIVATION,
    projectLeadId,
    projectManagerId,
    startDate,
    confirmDetails
  });
};

/**
 * Create a stage gate change request.
 * @param submitterId The ID of the user creating the change request.
 * @param wbsNumber the wbsNumber of the WBS element the change request is for.
 * @param leftoverBudget the amount of leftover budget in the WBS element being stage gated.
 * @param confirmDone are all details of the WBS element being stage gated fully completed?
 */
export const createStageGateChangeRequest = (
  submitterId: number,
  wbsNum: WbsNumber,
  leftoverBudget: number,
  confirmDone: boolean
) => {
  return axios.post<{ message: string }>(apiUrls.changeRequestsCreateStageGate(), {
    submitterId,
    wbsNum,
    type: CR_Type.STAGE_GATE,
    leftoverBudget,
    confirmDone
  });
};
