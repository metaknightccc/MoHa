import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';

const Rating = () => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    // Logic to submit the rating and review
    event.preventDefault();

    try {
      const response = axios.post('/course/rating_class', {
        rating: rating,
        review: review,
        // course_id: 1,
        // student_id: 1,
        // begin_time: '2023-12-26 00:00:00',
        // end_time: '2023-12-29 00:00:00',
        course_id: location.state.course_class.course_id,
        student_id: location.state.course_class.student_id,
        begin_time: location.state.course_class.begin_time,
        end_time: location.state.course_class.end_time,
      });
      
      console.log('Submitted Rating:', rating, 'Review:', review); 
      alert("Rating Successful Added!")
      navigate(`/dashboard`);

    }
    catch (error) {
      console.error('Error submitting rating:', error);
    }
    axios.get('/course/cal_avg_rating')
  };

  return (
    <Container>
      <Row>
        <h1>Rate the Class</h1>
      </Row>
      <Row>
        <Col>
          {/* <RatingIndicator rating={rating} /> */}
          <div style={{fontWeight: 'bold', marginBottom: '10px' }}>
            Rating: {rating}
          </div>
          <Form.Range
              min="1" 
              max="5" 
              step="1" 
              value={rating} 
              onChange={handleRatingChange}
          />
        </Col>
        <Col></Col>
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