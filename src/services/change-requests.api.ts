/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { ChangeRequest, ChangeRequestType } from 'utils';
import { apiUrls } from '../shared/urls';

/**
 * Transforms a change request to ensure deep field transformation of date objects.
 *
 * @param changeRequest Incoming change request object supplied by the HTTP response.
 * @returns Properly transformed change request object.
 */
export const changeRequestTransformer = (changeRequest: ChangeRequest) => {
  const data: any = {
    ...changeRequest,
    dateSubmitted: new Date(changeRequest.dateSubmitted),
    dateReviewed: changeRequest.dateReviewed
      ? new Date(changeRequest.dateReviewed)
      : changeRequest.dateReviewed,
    dateImplemented: changeRequest.dateImplemented
      ? new Date(changeRequest.dateImplemented)
      : changeRequest.dateImplemented
  };
  if (changeRequest.type === ChangeRequestType.Activation) {
    data.startDate = new Date(data.startDate);
  }
  const output: ChangeRequest = data;
  return output;
};

/**
 * Fetches all change requests.
 */
export const getAllChangeRequests = () => {
  return axios.get<ChangeRequest[]>(apiUrls.changeRequests(), {
    transformResponse: (data) => JSON.parse(data).map(changeRequestTransformer)
  });
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
