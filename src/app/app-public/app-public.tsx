/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Switch, Route } from 'react-router-dom';
import { routes } from '../../shared/routes';
import Login from '../../components/login/login';
import AppAuthenticated from '../app-authenticated/app-authenticated';
import './app-public.module.css';

const AppPublic: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.LOGIN} component={Login} />
      <Route path="*" component={AppAuthenticated} />
    </Switch>
  );
};

export default AppPublic;
