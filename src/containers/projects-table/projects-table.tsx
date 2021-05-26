/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Project, WorkPackage } from 'utils';
import { apiFetch } from '../../shared/axios';
import { weeksPipe, fullNamePipe, wbsPipe } from '../../shared/pipes';
import PrjsTable from '../../components/projects-table/projects-table'; // Directly rename the default import
import { DisplayProject } from '../../components/projects-table/projects-table';
import './projects-table.module.css';

const ProjectsTable: React.FC = () => {
  const [allProjects, setAllProjects] = useState<DisplayProject[]>([]); // store projects data

  // Transforms given project data and sets local state
  const updateData = (response: AxiosResponse) => {
    setAllProjects(
      response.data.map((prj: Project) => {
        return {
          wbsNum: wbsPipe(prj.wbsNum),
          name: prj.name,
          projectLead: fullNamePipe(prj.projectLead),
          projectManager: fullNamePipe(prj.projectManager),
          duration: weeksPipe(
            prj.workPackages.reduce((tot: number, cur: WorkPackage) => tot + cur.duration, 0)
          )
        };
      })
    );
  };

  // Fetch list of projects from API on component loading
  useEffect(() => {
    let mounted = true; // indicates component is mounted

    const fetchProjects = async () => {
      apiFetch
        .get('/projects')
        .then((response: AxiosResponse) => (mounted ? updateData(response) : ''))
        .catch((error) => (mounted ? console.log('fetch projects error: ' + error.message) : ''));
    };
    fetchProjects();

    // cleanup function indicates component has been unmounted
    return () => {
      mounted = false;
    };
  }, []);

  return <PrjsTable allProjects={allProjects} />;
};

export default ProjectsTable;
