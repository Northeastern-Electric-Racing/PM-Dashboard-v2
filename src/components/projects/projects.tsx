/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Route, Switch } from 'react-router-dom';
import { routes } from '../../shared/routes';
import ProjectsTable from './projects-table/projects-table';
import WBSDetails from './wbs-details/wbs-details';
import './projects.module.css';

const Projects: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.PROJECTS_BY_WBS} component={WBSDetails} />
      <Route path={routes.PROJECTS} component={ProjectsTable} />
    </Switch>
  );
};

export default Projects;
