import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import useToken from './hook/useToken';

const ERROR_STATUS = {
  Unauthorized: 'Please login to access this page',
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, saveToken, removeToken] = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const message = location.state?.message;
    if (message && message in ERROR_STATUS) {
      setMessage(ERROR_STATUS[message]);
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        axios.get('check_auth')
          .then((response) => {
            if (response.status === 200) {
              navigate('/dashboard');
            }

          })
          .catch((error) => {
            if (error.status === 302) {
              removeToken();
            }
          });
      }
    }
  }, [navigate, location.state, removeToken]);

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { username, password };

    axios
      .post('/login', credentials)
      .then((response) => {
        if (response.data.status === 'success') {
          // localStorage.setItem('token', response.data.token);
          saveToken(response.data.token);
          setMessage('Success!');
          navigate('/dashboard');
          window.location.reload();
        } else {
          setMessage('Unsuccessful: Bad username or password!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Error occurred while logging in');
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col  >
          <h2>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          {message && <Alert variant="danger">{message}</Alert>}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
