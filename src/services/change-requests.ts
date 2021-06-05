/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';
import { apiRoutes, ChangeRequest, ChangeRequestType } from 'utils';
import { useApiRequest } from './api-request';
import { fullNamePipe, wbsPipe } from '../shared/pipes';

/**
 * Transforms a change request to ensure deep field transformation of date objects.
 *
 * @param changeRequest Incoming change request object supplied by the HTTP response.
 * @returns Properly transformed change request object.
 */
export const changeRequestTransformer = (changeRequest: ChangeRequest) => {
  const data: any = {
    ...changeRequest,
    dateSubmitted: new Date(changeRequest.dateSubmitted).toLocaleDateString(),
    dateReviewed: changeRequest.dateReviewed
      ? new Date(changeRequest.dateReviewed).toLocaleDateString()
      : changeRequest.dateReviewed,
    dateImplemented: changeRequest.dateImplemented
      ? new Date(changeRequest.dateImplemented).toLocaleDateString()
      : changeRequest.dateImplemented,
      submitterName: fullNamePipe(changeRequest.submitter),
      wbsNum: wbsPipe(changeRequest.wbsNum)
  };
  if (changeRequest.type === ChangeRequestType.Activation) {
    data.startDate = new Date(data.startDate);
  }
  const output: ChangeRequest = data;
  return output;
};

export const allChangeRequestTransformer = (changeRequests: ChangeRequest[]) => {
  return changeRequests.map(changeRequestTransformer);
}

/**
 * Custom React Hook to supply the API response containing all change requests.
 *
 * @returns All change requests, via useApiRequest Hook pattern.
 */
export const useAllChangeRequests = () => {
  const config: AxiosRequestConfig = useMemo(
    () => ({ method: 'GET', url: apiRoutes.CHANGE_REQUESTS }),
    []
  );
  return useApiRequest<ChangeRequest[]>(config, allChangeRequestTransformer);
};

/**
 * Custom React Hook to supply the API response containing a single change request.
 *
 * @param id Change request ID of the requested change request.
 * @returns The requested change request, via useApiRequest Hook pattern.
 */
export const useSingleChangeRequest = (id: number) => {
  const config: AxiosRequestConfig = useMemo(
    () => ({ method: 'GET', url: `${apiRoutes.CHANGE_REQUESTS}/${id}` }),
    [id]
  );
  return useApiRequest<ChangeRequest>(config, changeRequestTransformer);
};
