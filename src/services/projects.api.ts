/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';
import { DescriptionBullet, Project, ProjectSummary, WbsNumber } from 'utils';
import { wbsPipe } from '../shared/pipes';
import { apiUrls } from '../shared/urls';
import { userTransformer } from './users.api';
import { workPackageTransformer } from './work-packages.api';

/**
 * Transforms a description bullet to ensure deep field transformation of date objects.
 *
 * @param bullet Incoming description bullet object supplied by the HTTP response.
 * @returns Properly transformed description bullet object.
 */
export const descriptionBulletTransformer = (bullet: DescriptionBullet) => {
  return {
    ...bullet,
    dateAdded: new Date(bullet.dateAdded),
    dateDeleted: bullet.dateDeleted ? new Date(bullet.dateDeleted) : bullet.dateDeleted
  };
};

/**
 * Transforms a project to ensure deep field transformation of date objects.
 *
 * @param project Incoming project object supplied by the HTTP response.
 * @returns Properly transformed project object.
 */
const projectTransformer = (project: Project) => {
  return {
    ...project,
    dateCreated: new Date(project.dateCreated),
    workPackages: project.workPackages.map(workPackageTransformer),
    goals: project.goals.map(descriptionBulletTransformer),
    features: project.features.map(descriptionBulletTransformer),
    otherConstraints: project.otherConstraints.map(descriptionBulletTransformer)
  };
};

/**
 * Transforms a project summary to ensure deep field transformation of date objects.
 *
 * @param projectSummary Incoming project object supplied by the HTTP response.
 * @returns Properly transformed project object.
 */
const projectSummaryTransformer = (projectSummary: ProjectSummary) => {
  return {
    ...projectSummary,
    projectLead: userTransformer(projectSummary.projectLead),
    projectManager: userTransformer(projectSummary.projectManager)
  } as ProjectSummary;
};

/**
 * Fetches all projects.
 */
export const getAllProjects = () => {
  return axios.get<ProjectSummary[]>(apiUrls.projects(), {
    transformResponse: (data) => JSON.parse(data).map(projectSummaryTransformer)
  });
};

/**
 * Fetches a single change request.
 *
 * @param wbsNum Project WBS number of the requested project.
 */
export const getSingleProject = (wbsNum: WbsNumber) => {
  return axios.get<Project>(apiUrls.projectsByWbsNum(wbsPipe(wbsNum)), {
    transformResponse: (data) => projectTransformer(JSON.parse(data))
  });
};
