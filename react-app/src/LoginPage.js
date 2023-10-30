import React, { useState } from 'react';
import './LoginPage.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Create a JSON object with the username and password
        const credentials = { username, password };

        // Send a POST request to the login endpoint
        fetch('/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
        .then((data) => {
            console.log(data);
            console.log(Response);
            console.log(credentials);
            if (data.status === 'success') {
                // Authentication successful
                // You can redirect to another page or update the UI here
                console.log('Login successful');
            } else {
                // Authentication failed
                console.log('error');
                setMessage(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <div className="error-message">{message}</div>}
        </div>
    );
}

export default Login;
