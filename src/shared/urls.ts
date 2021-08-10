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
const usersAuth = () => `${users()}/auth`;
const usersLogin = () => `${usersAuth()}:login`;
const usersLoginCheck = () => `${usersAuth()}:check`;

/**************** Projects Endpoint ****************/
const projects = () => `${API_URL}/projects`;
const projectsByWbsNum = (wbsNum: string) => `${projects()}/${wbsNum}`;

/**************** Work Packages Endpoint ****************/
const workPackages = () => `${API_URL}/work-packages`;
const workPackagesByWbsNum = (wbsNum: string) => `${workPackages()}/${wbsNum}`;

/**************** Change Requests Endpoint ****************/
const changeRequests = () => `${API_URL}/change-requests`;
const changeRequestsById = (id: string) => `${changeRequests()}/${id}`;
const changeRequestsReview = (id: string) => `${changeRequestsById(id)}/process:review`;

export const apiUrls = {
  users,
  usersById,
  usersLogin,
  usersLoginCheck,

  projects,
  projectsByWbsNum,

  workPackages,
  workPackagesByWbsNum,

  changeRequests,
  changeRequestsById,
  changeRequestsReview
};
