/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Route, Switch } from 'react-router-dom';
import { routes } from '../../../shared/routes';
import ChangeRequests from '../../pages/ChangeRequestsPage/change-requests';
import Projects from '../../pages/ProjectsPage/projects';
import { PageNotFound } from '../../pages/PageNotFoundPage/page-not-found';
import Home from '../../pages/HomePage/home';
import NavTopBar from '../../layouts/nav-top-bar/nav-top-bar';
import Settings from '../../pages/SettingsPage/settings';
import styles from './app-authenticated.module.css';
import Sidebar from '../../layouts/sidebar/sidebar';

const AppAuthenticated: React.FC = () => {
  return (
    <>
      <NavTopBar />
      <div>
        <Sidebar />
        <div className={styles.content}>
          <Switch>
            <Route path={routes.PROJECTS} component={Projects} />
            <Route path={routes.CHANGE_REQUESTS} component={ChangeRequests} />
            <Route path={routes.SETTINGS} component={Settings} />
            <Route exact path={routes.HOME} component={Home} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default AppAuthenticated;
