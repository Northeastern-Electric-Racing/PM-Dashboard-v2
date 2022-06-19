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
const workPackages = (status?: string, timelineStatus?: string, daysUntilDeadline?: string) => {
  let url = `${API_URL}/work-packages`;
  if (status) url += `?status=${status}&`;
  if (timelineStatus) url += `timelineStatus=${timelineStatus}&`;
  if (daysUntilDeadline) url += `daysUntilDeadline=${daysUntilDeadline}`;
  return url;
};
const workPackagesByWbsNum = (wbsNum: string) => `${workPackages()}/${wbsNum}`;
const workPackagesCreate = () => `${workPackages()}-create`;
const workPackagesEdit = () => `${workPackages()}-edit`;

/**************** Change Requests Endpoint ****************/
const changeRequests = () => `${API_URL}/change-requests`;
const changeRequestsById = (id: string) => `${changeRequests()}/${id}`;
const changeRequestsReview = () => `${changeRequests()}-review`;
const changeRequestsCreate = () => `${changeRequests()}-new`;
const changeRequestsCreateActivation = () => `${changeRequestsCreate()}-activation`;
const changeRequestsCreateStageGate = () => `${changeRequestsCreate()}-stage-gate`;
const changeRequestsCreateStandard = () => `${changeRequestsCreate()}-standard`;

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
  workPackagesEdit,

  changeRequests,
  changeRequestsById,
  changeRequestsReview,
  changeRequestsCreate,
  changeRequestsCreateActivation,
  changeRequestsCreateStageGate,
  changeRequestsCreateStandard
};
