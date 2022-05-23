/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../../../services/auth.hooks';
import { routes } from '../../../../shared/routes';
import Login from '../../../pages/LoginPage/login';
import AppAuthenticated from '../app-authenticated/app-authenticated';
import './app-public.module.css';

const AppPublic: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();
  return (
    <Switch>
      <Route path={routes.LOGIN}>
        <Login
          postLoginRedirect={{ url: history.location.pathname, search: history.location.search }}
        />
      </Route>
      <Route
        path="*"
        render={({ location }) =>
          auth.user === undefined ? (
            <Redirect
              to={{
                pathname: routes.LOGIN,
                state: { from: location }
              }}
            />
          ) : (
            <AppAuthenticated />
          )
        }
      />
    </Switch>
  );
};

export default AppPublic;
