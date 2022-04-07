/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Route, Switch } from 'react-router-dom';
import { routes } from '../../shared/routes';
import ChangeRequestsTable from './change-requests-table/change-requests-table';
import ChangeRequestDetails from './change-request-details/change-request-details';
import NewChangeRequest from './new-change-request/new-change-request';
import './change-requests.module.css';

const ChangeRequests: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.CHANGE_REQUESTS_NEW} component={NewChangeRequest} />
      <Route path={routes.CHANGE_REQUESTS_BY_ID} component={ChangeRequestDetails} />
      <Route path={routes.CHANGE_REQUESTS} component={ChangeRequestsTable} />
    </Switch>
  );
};

export default ChangeRequests;
