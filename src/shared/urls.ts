/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

/**
 * This file centralizes URLs used to query the API.
 */

const API_URL: string = `/.netlify/functions`;

/**************** Users Endpoint ****************/
const users = () => `${API_URL}/users`;
const usersById = (id: string) => `${users()}/${id}`;
const usersLogin = () => `${users()}/auth:login`;

/**************** Projects Endpoint ****************/
const projects = () => `${API_URL}/projects`;
const projectsByWbsNum = (wbsNum: string) => `${projects()}/${wbsNum}`;
const projectsCreate = () => `${projects()}-new`;
const projectsEdit = () => `${projects()}-edit`;

/**************** Work Packages Endpoint ****************/
const workPackages = () => `${API_URL}/work-packages`;
const workPackagesByWbsNum = (wbsNum: string) => `${workPackages()}/${wbsNum}`;
const workPackagesCreate = () => `${workPackages()}-create`;

/**************** Change Requests Endpoint ****************/
const changeRequests = () => `${API_URL}/change-requests`;
const changeRequestsById = (id: string) => `${changeRequests()}/${id}`;
const changeRequestsReview = () => `${changeRequests()}-review`;
const changeRequestsCreate = () => `${changeRequests()}-new`;

export const apiUrls = {
  users,
  usersById,
  usersLogin,

  projects,
  projectsByWbsNum,
  projectsCreate,
  projectsEdit,

  workPackages,
  workPackagesByWbsNum,
  workPackagesCreate,

  changeRequests,
  changeRequestsById,
  changeRequestsReview,
  changeRequestsCreate
};
