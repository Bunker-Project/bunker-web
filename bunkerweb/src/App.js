import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <NavBar showReturnButton={true}></NavBar>
      </Router>
      <Routes />
    </div>
  );
}

export default App;
