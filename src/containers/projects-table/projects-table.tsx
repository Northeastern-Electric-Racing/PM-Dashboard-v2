/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState, useEffect } from 'react';
import BootstrapTable, { ColumnDescription, SortOrder } from 'react-bootstrap-table-next';
import { apiFetch } from '../../shared/axios';
import { Project } from '../../types/project-types';
import styles from './projects-table.module.css';

const ProjectsTable: React.FC = () => {
  const initial: Project[] = [];
  const [allProjects, setAllProjects] = useState(initial);

  // Fetch list of projects from API on component loading
  useEffect(() => {
    const fetchProjects: Function = async function () {
      apiFetch
        .get('/projects')
        .then((response) =>
          setAllProjects(
            response.data.map((prj: Project) => {
              return { ...prj, duration: prj.duration + ' weeks' };
            })
          )
        )
        .catch((error) => console.log('fetch projects error: ' + error.message));
    };
    //setTimeout(fetchProjects, 2000); // simulated slow internet connection w/ 2 second delay
    fetchProjects();
  }, []);

  const columns: ColumnDescription[] = [
    { dataField: 'wbsNum', text: 'WBS #', align: 'center', sort: true },
    { dataField: 'name', text: 'Name', align: 'left', sort: true },
    { dataField: 'projectLead', text: 'Project Lead', align: 'left', sort: true },
    { dataField: 'projectManager', text: 'Project Manager', align: 'left', sort: true },
    { dataField: 'duration', text: 'Duration', align: 'center', sort: true }
  ];

  // issue: Sort by wbsNum means 1.1.0 > 1.12.0 > 1.2.0, but desired is 1.1.0 > 1.2.0 > 1.12.0
  // TODO will likely need to sort by separate ID
  const defaultSort: [{ dataField: any; order: SortOrder }] = [
    {
      dataField: 'wbsNum',
      order: 'asc'
    }
  ];

  return (
    <>
      <h3>This is the Projects Table container</h3>
      <BootstrapTable
        wrapperClasses={styles.table}
        bootstrap4={true}
        keyField="wbsNum"
        data={allProjects}
        columns={columns}
        defaultSorted={defaultSort}
        noDataIndication="No Projects to Display"
      />
    </>
  );
};

export default ProjectsTable;
