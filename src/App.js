import React from 'react';
import Clock from "./components/inc/clock"
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Clock/>
      </Router>
    </div>
  );
}

export default App;
