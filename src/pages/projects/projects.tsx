/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import ProjectsTable from '../../containers/projects-table/projects-table';
import './projects.module.css';

const Projects: React.FC = () => {
  return (
    <div>
      <h1>This is the Projects Page</h1>
      <ProjectsTable />
    </div>
  );
};

export default Projects;
