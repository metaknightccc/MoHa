import React from 'react';
import './App.css';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Template from './Template';
import RegistrationPage from './RegistrationPage';
import SearchResultPage from './SearchResultPage';
import DashboardPage from './DashboardPage';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CourseDescription from './CourseDescription';

// Set up Axios interceptor to add JWT token to all outgoing requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token);  // Add this line to check the token value
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set:', config.headers.Authorization);  // Add this line to check the header value
    console.log('Config:', config);  // Add this line to check the config value
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


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
          <Route path="coursedes" element={<CourseDescription />} />
        </Route>
        {/* Redirect to homepage if route is not found */}
        <Route path="*" element={<Template />} />
      </Routes>
    </Router>
  );
};

export default App;
