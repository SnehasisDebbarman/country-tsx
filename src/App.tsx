import React from 'react';

import Navbar from './Navbar/Navbar';
import FetchData from './FetchData';

import './App.css';

function App() {


  return (
    <div className="container">
      <Navbar />
      <FetchData />
      {/* generate body with name age and country name*/}
    </div>

  )
}

export default App;
