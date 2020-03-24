import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Routes from './Routes';

function App() {
  return (
    <div>
      {/* <NavBar></NavBar>
      <Main></Main> 
      */}
      <NavBar></NavBar>
      <Routes />
    </div>
  );
}

export default App;
