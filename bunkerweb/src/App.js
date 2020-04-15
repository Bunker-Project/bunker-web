import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './global.css';

function App() {
  return (
        <Routes />      
  );
}

export default App;
