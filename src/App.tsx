/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Switch, Route } from 'react-router-dom';
import ChangeRequests from './pages/change-requests/change-requests';
import Projects from './pages/projects/projects';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import NavTopBar from './components/nav-top-bar/nav-top-bar';
import './App.css';

function App() {
  return (
    <>
      <NavTopBar />
      <div className="page-content">
        <Switch>
          <Route path="/projects" component={Projects} />
          <Route path="/change-requests" component={ChangeRequests} />
          <Route exact path="/">
            <h3>Home!</h3>
          </Route>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
}

export default App;
