import { useState, useEffect } from 'react';
import { apiFetch } from '../../shared/axios';
import { Project } from '../../types/project-types';
import './projects-table.module.css';

const ProjectsTable: React.FC = () => {
  const initial: Project[] = [];
  const [allProjects, setAllProjects] = useState(initial);

  useEffect(() => {
    const fetchProjects: Function = async () => {
      const fetchedProjects: Project[] = await apiFetch.get('/projects');
      setAllProjects(fetchedProjects);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <p>This is the Projects Table container</p>
    </>
  );
};

export default ProjectsTable;
