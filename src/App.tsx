/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ChangeRequests from './pages/change-requests/change-requests';
import Projects from './pages/projects/projects';
import Sidebar from './components/sidebar/sidebar'
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Sidebar />
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
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/change-requests">
          <ChangeRequests />
        </Route>
        <Route path="/">
          <h3>Home!</h3>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
