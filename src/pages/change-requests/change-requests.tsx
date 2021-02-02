import './ChangeRequests.module.css';
import ChangeRequestsTable from '../../containers/change-requests-table/change-requests-table';

const ChangeRequests: React.FC = () => {
  return (
    <div>
      <h1>This is the Change Requests Page</h1>
      <ChangeRequestsTable />
    </div>
  );
};

export default ChangeRequests;
