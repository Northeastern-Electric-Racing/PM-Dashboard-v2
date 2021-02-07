/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChangeRequests from './pages/change-requests/change-requests';
import Projects from './pages/projects/projects';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>SCROLL DOWN</p>
      </header>
      <div>
        <Projects />
        <ChangeRequests />
      </div>
    </div>
  );
}

export default App;
