/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

/**************** General Section ****************/
const HOME: string = `/`;

/**************** Projects Section ****************/
const PROJECTS: string = `/projects`;
const PROJECTS_BY_WBS: string = `${PROJECTS}/:wbs`;

/**************** Change Requests Section ****************/
const CHANGE_REQUESTS: string = `/change-requests`;
const CHANGE_REQUESTS_BY_ID: string = `${CHANGE_REQUESTS}/:id`;
const CHANGE_REQUESTS_NEW: string = `${CHANGE_REQUESTS}/new`;

export const routes = {
  HOME,

  PROJECTS,
  PROJECTS_BY_WBS,

  CHANGE_REQUESTS,
  CHANGE_REQUESTS_BY_ID,
  CHANGE_REQUESTS_NEW
};