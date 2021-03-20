/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { ChangeRequest, exampleAllChangeRequests } from 'utils';
import ChangeRequestDetails from '../../components/change-request-details/change-request-details';
import styles from './change-requests-table.module.css';

const ChangeRequestsTable: React.FC = () => {
  const crOptions: Array<string> = ['Duration', 'Budget', 'Scope'];
  const [changeRequestOption, setChangeRequestOption] = useState(0);

  const switchCR = () => {
    changeRequestOption === 2
      ? setChangeRequestOption(0)
      : setChangeRequestOption(changeRequestOption + 1);
  };

  return (
    <div>
      <h1>This is the Change Requests Table container</h1>
      <p className={styles.label}>{crOptions[changeRequestOption]}</p>
      <button onClick={switchCR}>Click me!</button>
      {exampleAllChangeRequests.map((cr: ChangeRequest, idx: number) => (
        <div key={idx}>
          <br />
          <hr />
          <ChangeRequestDetails changeRequest={cr} />
        </div>
      ))}
    </div>
  );
};

export default ChangeRequestsTable;
