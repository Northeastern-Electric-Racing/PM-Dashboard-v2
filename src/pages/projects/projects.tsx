/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Route, Switch } from 'react-router-dom';
import ProjectsTable from '../../containers/projects-table/projects-table';
import WBSDetails from '../wbs-details/wbs-details';
import WorkPackageSummary from '../../components/work-package-summary/work-package-summary'
import './projects.module.css';

// Remove later
import { exampleWorkPackage3 } from 'utils';

const Projects: React.FC = () => {
  return (
    <div>
      <h1>This is the Projects Page</h1>
      <WorkPackageSummary workPackage={exampleWorkPackage3}/> {/* To be removed later */}
      <hr></hr> {/* To be removed later */}
      <Switch>
        <Route path="/projects/:wbsNum" component={WBSDetails} />
        <Route path="/projects" component={ProjectsTable} />
      </Switch>
    </div>
  );
};

export default Projects;
