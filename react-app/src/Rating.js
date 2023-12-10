import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';



const Rating = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (rate) => {
    setRating(rate);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // Logic to submit the rating and review
    console.log('Submitted Rating:', rating, 'Review:', review);
  };

  return (
    <Container>
      <Row>
        <h1>Rate the Class</h1>
      </Row>
      <Row>
        <Col>
          <div class="container">
            <span id="rateMe1"></span>
          </div>
        </Col>
      </Row>
      <Row>
        <Form>
          <Form.Group>
            <Form.Label>Write a Review</Form.Label>
            <Form.Control as="textarea" rows={3} value={review} onChange={handleReviewChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>Submit Review</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Rating;
