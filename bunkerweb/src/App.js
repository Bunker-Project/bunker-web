import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './global.css';

function App() {
  return (
    // <div>
      <Router>
        <NavBar hiddenReturnButton={true}></NavBar>
        <Routes />
      </Router>
  );
}

export default App;
