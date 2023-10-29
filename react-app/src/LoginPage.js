import React, { useState } from 'react';
import "./LoginPage.css";
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        username: username,
        password: password,
      });

      // Handle the successful login response here
      if (response.status_code=400) {
        setStatusMessage(response.data.error);
        console.error('Login error', response.data.error);
        // Display the error message to the user (e.g., in a div element)
        //setError(response.data.error);
      } else {
        // Handle the successful login response here
        console.log('Login successful', response.data.message);
        // You can perform client-side redirection or other actions after a successful login.
        // Example: window.location.href = '/dashboard';
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Network error', error);
      //setError('An error occurred. Please try again later.'); // Display a generic error message
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* Display the status message */}
      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </div>
  );
}

export default LoginPage;