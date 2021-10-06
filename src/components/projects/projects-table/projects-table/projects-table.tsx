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
//import { prisma } from '../../../../backend/prisma/seed-data/users';
import { User } from '@prisma/client';

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
