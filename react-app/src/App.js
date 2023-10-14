import React from 'react';
import './App.css';
import LoginPage from './LoginPage';
import FetchData from './FetchData';
import Template from './Template';

function App() {
  return (
    <div className="App">
      <Template>
        <FetchData/>
      </Template>
    </div>
  );
}

export default App;
