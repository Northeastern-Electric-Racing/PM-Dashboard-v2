/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BootstrapTable, {
  ColumnDescription,
  RowEventHandlerProps,
  SortOrder
} from 'react-bootstrap-table-next';
import { AxiosResponse } from 'axios';
import { Project } from 'utils';
import { apiFetch } from '../../shared/axios';
import styles from './projects-table.module.css';
import { response } from 'msw/lib/types';

/**
 * Interactive table for fetching and displaying all projects data.
 */
const ProjectsTable: React.FC = () => {
  const history = useHistory();
  const initial: Project[] = [];
  const [allProjects, setAllProjects] = useState(initial); // store projects data

  // Transforms given project data and sets local state
  const updateData: Function = (response: AxiosResponse) => {
    setAllProjects(
      response.data.map((prj: Project) => {
        return { ...prj, duration: prj.duration + ' weeks' };
      })
    );
  };

  // Fetch list of projects from API on component loading
  useEffect(() => {
    let mounted = true; // indicates component is mounted

    const fetchProjects: Function = async () => {
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

  // Configures display options for all data columns
  // TODO: Sort by wbsNum means 1.1.0 > 1.12.0 > 1.2.0, but desired is 1.1.0 > 1.2.0 > 1.12.0
  // TODO: Sort by duration means 12 > 2 > 4 > 5 > 9, but desired is 12 > 9 > 5 > 4 > 2
  const columns: ColumnDescription[] = [
    { dataField: 'wbsNum', text: 'WBS #', align: 'center', sort: true },
    { dataField: 'name', text: 'Name', align: 'left', sort: true },
    { dataField: 'projectLead', text: 'Project Lead', align: 'left', sort: true },
    { dataField: 'projectManager', text: 'Project Manager', align: 'left', sort: true },
    { dataField: 'duration', text: 'Duration', align: 'center', sort: true }
  ];

  const defaultSort: [{ dataField: any; order: SortOrder }] = [
    {
      dataField: 'wbsNum',
      order: 'asc'
    }
  ];

  // define what happens during various row events
  const rowEvents: RowEventHandlerProps = {
    onClick: (e, row, rowIndex) => {
      history.push({
        pathname: `/projects/${row.wbsNum}`,
        state: allProjects[rowIndex]
      });
    }
  };

  return (
    <>
      <h3>This is the Projects Table container</h3>
      <BootstrapTable
        striped
        hover
        condensed
        wrapperClasses={styles.table}
        bootstrap4={true}
        keyField="wbsNum"
        data={allProjects}
        columns={columns}
        defaultSorted={defaultSort}
        rowEvents={rowEvents}
        noDataIndication="No Projects to Display"
      />
    </>
  );
};

export default ProjectsTable;
