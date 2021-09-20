/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useHistory } from 'react-router-dom';
import BootstrapTable, {
  ColumnDescription,
  RowEventHandlerProps,
  SortOrder
} from 'react-bootstrap-table-next';
import PageTitle from '../../../shared/page-title/page-title';
import styles from './projects-table.module.css';

export interface DisplayProject {
  wbsNum: string;
  name: string;
  projectLead: string;
  projectManager: string;
  duration: string;
}

interface DisplayProjectProps {
  allProjects: DisplayProject[];
}

/**
 * Interactive table for displaying all projects table data.
 */
const ProjectsTable: React.FC<DisplayProjectProps> = ({ allProjects }: DisplayProjectProps) => {
  const history = useHistory();

  // Configures display options for all data columns
  // TODO: Sort by duration means 12 > 2 > 4 > 5 > 9, but desired is 12 > 9 > 5 > 4 > 2
  const columns: ColumnDescription[] = [
    { headerAlign: 'center', dataField: 'wbsNum', text: 'WBS #', align: 'center', sort: true,

      // Custom Sort algorithm for version numbers separated by ".".
      sortFunc: (a, b, order:SortOrder) => {
        const a_arr = a.split('.');
        const b_arr = b.split('.');
        const len = Math.min(a_arr.length, b_arr.length);
        for (let i = 0; i < len; i++) {
          const a_current = +a_arr[i] || 0;
          const b_current = +b_arr[i] || 0;
          if (a_current !== b_current) {
            if (order === "asc") {
              return a_current > b_current ? 1 : -1;
            } else {
              return a_current > b_current ? -1 : 1;
            }
          }
        }
        return b_arr.length - a_arr.length;
      }

    },
    { headerAlign: 'center', dataField: 'name', text: 'Name', align: 'center', sort: true },
    {
      headerAlign: 'center',
      dataField: 'projectLead',
      text: 'Project Lead',
      align: 'center',
      sort: true
    },
    {
      headerAlign: 'center',
      dataField: 'projectManager',
      text: 'Project Manager',
      align: 'center',
      sort: true
    },
    { headerAlign: 'center', dataField: 'duration', text: 'Duration', align: 'center', sort: true }
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
      history.push(`/projects/${row.wbsNum}`);
    }
  };

  return (
    <>
      <PageTitle title={'All Projects'} />
      <BootstrapTable
        striped
        hover
        condensed
        bootstrap4
        wrapperClasses={styles.table}
        keyField="wbsNum"
        data={allProjects}
        columns={columns}
        defaultSorted={defaultSort}
        rowEvents={rowEvents}
        noDataIndication="No Projects to Display"
        rowStyle={{ cursor: 'pointer' }}
      />
    </>
  );
};

export default ProjectsTable;
