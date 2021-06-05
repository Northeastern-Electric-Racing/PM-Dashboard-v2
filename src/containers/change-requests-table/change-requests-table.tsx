/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import CRTable from '../../components/change-requests-table/change-requests-table'; // Directly rename the default import
import './change-requests-table.module.css';
import { useAllChangeRequests } from '../../services/change-requests';

const ChangeRequestsTable: React.FC = () => {

  const { isLoading, errorMessage, responseData } = useAllChangeRequests();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (errorMessage !== '' || responseData === undefined) {
    return (
      <>
        <h3>Oops, sorry!</h3>
        <h5>There was an error loading the page.</h5>
        <p>{errorMessage ? errorMessage : 'The data did not load properly.'}</p>
      </>
    );
  }
  return <CRTable changeRequests={responseData!} />;
};

export default ChangeRequestsTable;
