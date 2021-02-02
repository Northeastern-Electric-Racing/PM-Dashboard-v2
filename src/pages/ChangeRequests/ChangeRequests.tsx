import './ChangeRequests.module.css';
import ChangeRequestsTable from '../../containers/ChangeRequestsTable/ChangeRequestsTable';

const ChangeRequests: React.FC = () => {
  return (
    <div>
      <h1>This is the Change Requests Page</h1>
      <ChangeRequestsTable />
    </div>
  );
};

export default ChangeRequests;
