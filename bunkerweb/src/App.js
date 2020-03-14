import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Main from './components/Main';
import SpeedDials from './components/FABButton';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Main></Main>
      
    </div>
  );
}

export default App;
