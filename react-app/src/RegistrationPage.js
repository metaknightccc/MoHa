import React, { useState } from "react";
import "./RegistrationPage.css";
import { Container, Form, Button } from "react-bootstrap";

function RegistrationPage(isStd) {
  const [isStudent, setIsStudent] = useState(isStd);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    social_security_number: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const endpoint = isStudent
      ? "/reg/register_student"
      : "/reg/register_tutor";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((error) => console.error("Error registering:", error));
  };

  return (
    <Container>
      <Button variant="primary" onClick={() => setIsStudent(!isStudent)}>
        Switch to {isStudent ? "Tutor" : "Student"} Registration
      </Button>
      <h1>{isStudent ? "Student Registration" : "Tutor Registration"}</h1>
      <Form onSubmit={handleRegistrationSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleInputChange}
          />
        </Form.Group>
        {!isStudent && (
          <>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSSN">
              <Form.Label>Social Security Number</Form.Label>
              <Form.Control
                type="text"
                name="social_security_number"
                onChange={handleInputChange}
              />
            </Form.Group>
          </>
        )}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationPage;
