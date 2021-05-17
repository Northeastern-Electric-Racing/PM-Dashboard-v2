/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { apiRoutes, ChangeRequest, ChangeRequestType } from 'utils';
import { useApiRequest } from './api-request';

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
 * Custom React Hook to supply the API response containing all change requests.
 *
 * @returns All change requests, via useApiRequest Hook pattern.
 */
export const useAllChangeRequests = () => {
  return useApiRequest<ChangeRequest[]>(
    { method: 'GET', url: apiRoutes.CHANGE_REQUESTS },
    (response: ChangeRequest[]) => response.map(changeRequestTransformer)
  );
};

/**
 * Custom React Hook to supply the API response containing a single change request.
 *
 * @param id Change request ID of the requested change request.
 * @returns The requested change request, via useApiRequest Hook pattern.
 */
export const useSingleChangeRequest = (id: number) => {
  return useApiRequest<ChangeRequest>(
    { method: 'GET', url: `${apiRoutes.CHANGE_REQUESTS}/${id}` },
    changeRequestTransformer
  );
};
