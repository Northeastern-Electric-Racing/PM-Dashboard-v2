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
import { validateWBS } from 'utils';

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
 * Custom sorting order for wbsNums according to car, then project, then workPackage.
 * @param a 1st wbsNum in string form
 * @param b 2nd wbsNum in string form
 * @param order Imported SortOrder values 'asc' or 'desc'
 * @return number A number describing the value of a relative to b,
 *                according to the specified SortOrder.
 */
export function wbsNumSort(a: string, b: string, order: SortOrder) {
  const wbs_a = validateWBS(a);
  const wbs_b = validateWBS(b);
  if (wbs_a.car !== wbs_b.car) {
    if (order === 'asc') {
      return wbs_a.car - wbs_b.car;
    } else {
      return wbs_b.car - wbs_a.car;
    }
  }
  if (wbs_a.project !== wbs_b.project) {
    if (order === 'asc') {
      return wbs_a.project - wbs_b.project;
    } else {
      return wbs_b.project - wbs_a.project;
    }
  }
  if (wbs_a.workPackage !== wbs_b.workPackage) {
    if (order === 'asc') {
      return wbs_a.workPackage - wbs_b.workPackage;
    } else {
      return wbs_b.workPackage - wbs_a.workPackage;
    }
  } else {
    return 0; // Both wbsNums are exactly equal.
  }
}

/**
 * Interactive table for displaying all projects table data.
 */
const ProjectsTable: React.FC<DisplayProjectProps> = ({ allProjects }: DisplayProjectProps) => {
  const history = useHistory();

  // Configures display options for all data columns
  const columns: ColumnDescription[] = [
    {
      headerAlign: 'center',
      dataField: 'wbsNum',
      text: 'WBS #',
      align: 'center',
      sort: true,
      sortFunc: wbsNumSort
    },
    {
      headerAlign: 'center',
      dataField: 'name',
      text: 'Name',
      align: 'left',
      sort: true
    },
    {
      headerAlign: 'center',
      dataField: 'projectLead',
      text: 'Project Lead',
      align: 'left',
      sort: true
    },
    {
      headerAlign: 'center',
      dataField: 'projectManager',
      text: 'Project Manager',
      align: 'left',
      sort: true
    },
    {
      headerAlign: 'center',
      dataField: 'duration',
      text: 'Duration',
      align: 'center',
      sort: true
    }
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
