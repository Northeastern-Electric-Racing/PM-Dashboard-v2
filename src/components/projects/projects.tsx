/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Route, Switch } from 'react-router-dom';
import ProjectsTable from './projects-table/projects-table';
import WBSDetails from './wbs-details/wbs-details';
import './projects.module.css';

const Projects: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route path="/projects/:wbsNum" component={WBSDetails} />
        <Route path="/projects" component={ProjectsTable} />
      </Switch>
    </div>
  );
};

export default Projects;
