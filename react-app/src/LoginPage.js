import React, { useState, useEffect} from "react";
import "./LoginPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ERROR_STATUS = {
  Unauthorized: 'Please login to access this page',
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      if(message in ERROR_STATUS) {
        setMessage(ERROR_STATUS[message]);
      }
    }else{
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = { username, password };

    axios.post("/login", credentials)
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.token);
          setMessage("Success!");
          navigate("/");
        } else {
          setMessage("Unsuccessful: Bad username or password!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error occurred while logging in");
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
