import { useState, useEffect } from 'react';
import ProjectDetails from '../../components/project-details/project-details';
import { Project } from '../../types/project-types';
import './ProjectsTable.module.css';

const prj0: Project = { name: '', duration: 0 };
const prj1: Project = { name: 'Smash the big thing', duration: 5 };
const prj2: Project = { name: 'Weld it all on', duration: 236 };

const ProjectsTable: React.FC = () => {
  const [exProject, setExProject] = useState(prj0);

  useEffect(() => setExProject(prj1));

  const swapPrj = () => {
    setExProject(prj2);
  };

  return (
    <div>
      <p>This is the Projects Table container</p>
      <ProjectDetails project={exProject} />
      <a onClick={swapPrj}>Swap it!</a>
    </div>
  );
};

export default ProjectsTable;
