/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

/**************** Users Endpoint ****************/
const USERS: string = `/users`;
const USERS_LOGIN: string = `${USERS}/login`;

/**************** Projects Endpoint ****************/
const PROJECTS: string = `/projects`;
const PROJECTS_SINGLE: string = `${PROJECTS}/:wbs`;

/**************** Work Packages Endpoint ****************/
const WORK_PACKAGES: string = `/work-packages`;
const WORK_PACKAGES_SINGLE: string = `${WORK_PACKAGES}/:wbs`;

/**************** Change Requests Endpoint ****************/
const CHANGE_REQUESTS: string = `/projects`;
const CHANGE_REQUESTS_SINGLE: string = `${CHANGE_REQUESTS}/:wbs`;
const CHANGE_REQUESTS_SINGLE_REVIEW: string = `${CHANGE_REQUESTS_SINGLE}\\:review`;

export const apiRoutes = {
  USERS,
  USERS_LOGIN,

  PROJECTS,
  PROJECTS_SINGLE,

  WORK_PACKAGES,
  WORK_PACKAGES_SINGLE,

  CHANGE_REQUESTS,
  CHANGE_REQUESTS_SINGLE,
  CHANGE_REQUESTS_SINGLE_REVIEW
};
