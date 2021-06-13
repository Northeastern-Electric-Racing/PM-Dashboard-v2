/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

/**
 * Output of any API request custom hook.
 */
export interface ApiHookReturn<ReturnObj> {
  isLoading: boolean;
  errorMessage: string;
  responseData: ReturnObj | undefined;
}

/**
 * Conditionally execute a callback based on the provided boolean.
 *
 * @param isMounted Whether or not to execute the callback function.
 * @param callback The function to call if isMounted is true.
 */
const doIfMounted = (isMounted: boolean, callback: () => void) => {
  if (isMounted) {
    callback();
  }
};

/**
 * Builds a human-readable error message from the API request error object.
 *
 * @param error Error object returned from .catch of an API request.
 * @returns API request error message string.
 */
const buildErrorMessage = (error: any) => {
  let message = 'API request error: ';
  if (error.response) {
    message += `Server responded with status code ${error.response.status}, ${error.response.statusText}.`;
    if (error.response.data.message) {
      message += ` Server error message: ${error.response.data.message}`;
    }
  } else if (error.request) {
    message += `Error sending request, ${error.message}.`;
  } else {
    message += `Other error ${error.message}.`;
  }
  return message;
};

/**
 * Custom React Hook to perform HTTP requests to the application's back-end API.
 *
 * @param config Axios HTTP request configuration object.
 * @param transform A function to ensure deep translation from JSON to TypeScript application types.
 *                  If no transformation is required, pass in the identity function.
 * @returns ApiHookReturn object with a loading indicator, error message, and the actual resulting response object.
 */
export const useApiRequest = <ReturnObj>(
  config: AxiosRequestConfig,
  transform: (responseObject: ReturnObj) => ReturnObj
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [responseData, setResponseData] = useState<ReturnObj>();

  useEffect(() => {
    let isMounted = true;

    axios
      .request<ReturnObj, AxiosResponse<ReturnObj>>({ ...config })
      .then((response) => doIfMounted(isMounted, () => setResponseData(transform(response.data))))
      .catch((error) => doIfMounted(isMounted, () => setErrorMessage(buildErrorMessage(error))))
      .finally(() => doIfMounted(isMounted, () => setIsLoading(false)));

    return () => {
      isMounted = false;
    };
  }, [config, transform]);

  return { isLoading, errorMessage, responseData };
};
