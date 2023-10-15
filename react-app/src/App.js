import React from 'react';
import './App.css';
import LoginPage from './LoginPage';
import FetchData from './FetchData';
import Template from './Template';
import RegistrationPage from './RegisterationPage';

function App() {
  return (
    <div className="App">
      <Template>
        <RegistrationPage/>
      </Template>
    </div>
  );
}

export default App;
