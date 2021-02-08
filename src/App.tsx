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
