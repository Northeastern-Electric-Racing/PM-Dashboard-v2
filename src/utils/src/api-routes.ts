/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

export const API_URL: string = `/.netlify/functions`;

/**************** Users Endpoint ****************/
const USERS: string = `/users`;
const USERS_BY_ID: string = `${USERS}/:id`;
const USERS_LOGIN: string = `${USERS}/auth\\:login`;

/**************** Projects Endpoint ****************/
const PROJECTS: string = `/projects`;
const PROJECTS_BY_WBS: string = `${PROJECTS}/:wbsNum`;
const PROJECTS_EDIT: string = `${PROJECTS}-edit`;

/**************** Risks Endpoint ****************/
const RISKS: string = `/risks`;
const RISKS_CREATE: string = `${RISKS}-create`;

/**************** Work Packages Endpoint ****************/
const WORK_PACKAGES: string = `/work-packages`;
const WORK_PACKAGES_BY_WBS: string = `${WORK_PACKAGES}/:wbsNum`;
const WORK_PACKAGES_CREATE: string = `${WORK_PACKAGES}-create`;
const WORK_PACKAGES_EDIT: string = `${WORK_PACKAGES}-edit`;

/**************** Change Requests Endpoint ****************/
const CHANGE_REQUESTS: string = `/change-requests`;
const CHANGE_REQUESTS_NEW: string = `${CHANGE_REQUESTS}-new`;
const CHANGE_REQUESTS_BY_ID: string = `${CHANGE_REQUESTS}/:id`;
const CHANGE_REQUESTS_REVIEW: string = `${CHANGE_REQUESTS}-review`;

export const apiRoutes = {
  USERS,
  USERS_BY_ID,
  USERS_LOGIN,

  PROJECTS,
  PROJECTS_BY_WBS,
  PROJECTS_EDIT,

  WORK_PACKAGES,
  WORK_PACKAGES_BY_WBS,
  WORK_PACKAGES_CREATE,
  WORK_PACKAGES_EDIT,

  CHANGE_REQUESTS,
  CHANGE_REQUESTS_NEW,
  CHANGE_REQUESTS_BY_ID,
  CHANGE_REQUESTS_REVIEW
};
