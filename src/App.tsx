/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ChangeRequests from './pages/change-requests/change-requests';
import Projects from './pages/projects/projects';
import './App.css';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import Login from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/projects">
          Projects
        </Link>
        <Link className="nav-link" to="/change-requests">
          Change Requests
        </Link>
      </nav>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/projects" component={Projects} />
        <Route path="/change-requests" component={ChangeRequests} />
        <Route exact path="/">
          <h3>Home!</h3>
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
