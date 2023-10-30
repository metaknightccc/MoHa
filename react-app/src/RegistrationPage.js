import React, { useState } from "react";
import "./RegistrationPage.css";
import { Container, Form, Col, Row, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    social_security_number: "",
  });
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const endpoint = isStudent
        ? "/reg/register_student"
        : "/reg/register_tutor";
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        } else {
          console.error("Error registering:", response.data.error);
          // Display the error message to the user (e.g., in a div element)
          //setError(response.data.error);
        }
      })
      .catch((error) => console.error("Error registering:", error));
    }
    setValidated(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Registration</h2>
        </Col>
        <Col>
          <Nav
            variant="underline"
            defaultActiveKey="student"
            onSelect={(key) => setIsStudent(key === "student")}
          >
            <Nav.Item>
              <Nav.Link eventKey="student">For Student</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tutor">For Tutor</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleRegistrationSubmit}
      >
        <Form.Group as={Row} controlId="formFirstName">
          <Form.Label column sm={4}>
            First Name
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              required
              type="text"
              name="first_name"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a first name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formLastName">
          <Form.Label column sm={4}>
            Last Name
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              required
              type="text"
              name="last_name"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a last name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formUsername">
          <Form.Label column sm={4}>
            Username
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              required
              type="text"
              name="username"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm={4}>
            Password
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              required
              type="password"
              name="password"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {!isStudent && (
          <>
            <Form.Group as={Row} controlId="formEmail">
              <Form.Label column sm={4}>
                Email
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPhoneNumber">
              <Form.Label column sm={4}>
                Phone Number
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  required
                  type="tel"
                  name="phone_number"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formSSN">
              <Form.Label column sm={4}>
                Social Security Number
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  required
                  type="text"
                  name="social_security_number"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid social security number.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </>
        )}
        <Row>
          <Col sm={{ span: 7, offset: 4 }}>
            <Form.Group>
              <Form.Control
                type="submit"
                value="Register"
                className="btn btn-primary"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default RegistrationPage;
