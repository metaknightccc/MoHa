import React from 'react';
import './App.css';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Template from './Template';
import RegistrationPage from './RegistrationPage';
import SearchResultPage from './SearchResultPage';
import DashboardPage from './DashboardPage';


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="reg/register_student" element={<RegistrationPage isStd={true} />} />
          <Route path="reg/register_tutor" element={<RegistrationPage isStd={false} />} />
          <Route path="search" element={<SearchResultPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
        {/* Redirect to homepage if route is not found */}
        <Route path="*" element={<Template />} />
      </Routes>
    </Router>
  );
};

export default App;
