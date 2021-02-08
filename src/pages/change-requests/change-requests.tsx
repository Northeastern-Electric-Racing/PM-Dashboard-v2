/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import styles from './change-requests.module.css';
import ChangeRequestsTable from '../../containers/change-requests-table/change-requests-table';

const ChangeRequests: React.FC = () => {
  return (
    <div>
      <h1 className={styles.title}>This is the Change Requests Page</h1>
      <ChangeRequestsTable />
    </div>
  );
};

export default ChangeRequests;
