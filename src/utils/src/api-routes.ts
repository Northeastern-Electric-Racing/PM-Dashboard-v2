/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

export const API_URL: string = `/.netlify/functions`;

/**************** Users Endpoint ****************/
const USERS: string = `/users`;
const USERS_LOGIN: string = `${USERS}/login`;

/**************** Projects Endpoint ****************/
const PROJECTS: string = `/projects`;
const PROJECTS_BY_WBS: string = `${PROJECTS}/:wbs`;

/**************** Work Packages Endpoint ****************/
const WORK_PACKAGES: string = `/work-packages`;
const WORK_PACKAGES_BY_WBS: string = `${WORK_PACKAGES}/:wbs`;

/**************** Change Requests Endpoint ****************/
const CHANGE_REQUESTS: string = `/change-requests`;
const CHANGE_REQUESTS_BY_ID: string = `${CHANGE_REQUESTS}/:id`;
const CHANGE_REQUESTS_REVIEW: string = `${CHANGE_REQUESTS_BY_ID}\\:review`;

export const apiRoutes = {
  USERS,
  USERS_LOGIN,

  PROJECTS,
  PROJECTS_BY_WBS,

  WORK_PACKAGES,
  WORK_PACKAGES_BY_WBS,

  CHANGE_REQUESTS,
  CHANGE_REQUESTS_BY_ID,
  CHANGE_REQUESTS_REVIEW
};
