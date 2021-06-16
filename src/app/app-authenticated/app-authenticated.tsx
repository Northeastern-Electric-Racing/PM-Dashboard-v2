/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Switch, Route } from 'react-router-dom';
import ChangeRequests from '../../components/change-requests/change-requests';
import Projects from '../../components/projects/projects';
import { PageNotFound } from '../../components/page-not-found/page-not-found';
import Home from '../../components/home/home';
import NavTopBar from '../../components/shared/nav-top-bar/nav-top-bar';
import styles from './app-authenticated.module.css';

const AppAuthenticated: React.FC = () => {
  return (
    <>
      <NavTopBar />
      <div className={styles.content}>
        <Switch>
          <Route path="/projects" component={Projects} />
          <Route path="/change-requests" component={ChangeRequests} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
};

export default AppAuthenticated;
