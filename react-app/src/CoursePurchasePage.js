import React from "react";
import { useState } from "react";
import axios from "axios";
import { Container, Col, Row, Tab, ListGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
const CoursePurchasePage = ({ props }) => {
  const [hours, setHours] = useState(1); // Initial hours

  const handleIncrement = () => {
    setHours(prevHours => prevHours + 1);
  };

  const handleDecrement = () => {
    setHours(prevHours => Math.max(prevHours - 1, 0)); // Prevents negative values
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setHours(isNaN(value) ? 0 : value);
  };


  return (
    <Container>
      <Row>
        <Col>
          <h1>Course Purchase Page</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
            <FormControl
              type="number"
              value={hours}
              onChange={handleChange}
              aria-label="Course hours"
            />
            <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
          </InputGroup>
        </Col>
        <Col lg={4}>
          <Button variant="primary">Purchase</Button>
        </Col>
      </Row>

    </Container>

  );

};

export default CoursePurchasePage;