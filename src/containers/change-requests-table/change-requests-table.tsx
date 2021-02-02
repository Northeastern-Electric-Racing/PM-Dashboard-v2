import { useState } from 'react';
import './ChangeRequestsTable.module.css';

const ChangeRequestsTable: React.FC = () => {
  const crOptions: Array<String> = ['Delay', 'Budget', 'Scope'];
  const [changeRequest, setChangeRequest] = useState(0);

  const switchCR = () => {
    changeRequest === 2 ? setChangeRequest(0) : setChangeRequest(changeRequest + 1);
  };

  return (
    <div>
      <h1>This is the Change Requests Table container</h1>
      <p>{crOptions[changeRequest]}</p>
      <a onClick={switchCR}>Click me!</a>
    </div>
  );
};

export default ChangeRequestsTable;
