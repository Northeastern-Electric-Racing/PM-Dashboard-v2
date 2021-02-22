/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import React from 'react';
import './App.css';
import ChangeRequests from './pages/change-requests/change-requests';
import Projects from './pages/projects/projects';

function App() {
  return (
    <div className="App">
      <div>
        <Projects />
        <ChangeRequests />
      </div>
    </div>
  );
}

export default App;
