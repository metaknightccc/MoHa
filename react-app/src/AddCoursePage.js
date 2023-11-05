import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCoursePage.css';
import { Form, Button } from 'react-bootstrap';

const AddClassPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: 0.0,
    description: '',
  });

  const [isNewSubject, setIsNewSubject] = useState(false); // State for the "New Subject?" checkbox
  const [existingSubjects, setExistingSubjects] = useState([]); // State to store existing subjects

  useEffect(() => {
    // Fetch existing subjects when the component loads
    fetchExistingSubjects();
  }, []);

  const fetchExistingSubjects = async () => {
    try {
      const response = await fetch('/dashboard/get_existing_subjects');
      if (response.ok) {
        const subjects = await response.json();
        setExistingSubjects(subjects);
      } else {
        console.error('Failed to fetch existing subjects');
      }
    } catch (error) {
      console.error('Error fetching existing subjects:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
    axios.post('/dashboard/add_course', formData)
      .then((response) => {
        // Handle the response data as needed
        console.log('Course added:', response.data);
      })
      .catch((error) => {
        console.error('Error adding course:', error);
      });
    console.log('Form Data:', formData);
  };

  return (
    <div className="addClass-page">
      <h2>Add Class</h2>
      <Form.Group>
          <Form.Label>Course Picture</Form.Label>
          <Form.Control type="file" name="pic" onChange={handleInputChange} />
        </Form.Group>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Class Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Class Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="isNewSubject">
          <Form.Check
            type="checkbox"
            label="New Subject?"
            name="isNewSubject"
            checked={isNewSubject}
            onChange={(e) => setIsNewSubject(e.target.checked)}
          />
        </Form.Group>
        {isNewSubject ? (
          <div>
            <Form.Group controlId="subject_name">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                name="subject_name"
                value={formData.subject_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="major">
              <Form.Label>Major</Form.Label>
              <Form.Control
                type="text"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="academic">
              <Form.Check
                type="checkbox"
                label="Academic"
                name="academic"
                checked={formData.academic}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        ) : (
          <Form.Group controlId="subject_name">
            <Form.Label>Subject Name</Form.Label>
            <Form.Select
              name="subject_name"
              value={formData.subject_name}
              onChange={handleInputChange}
            >
              <option value="">Select a subject</option>
              {existingSubjects.map((subject) => (
                <option key={subject.subject_name} value={subject.subject_name}>
                  {subject.subject_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          Add Class
        </Button>
      </Form>
    </div>
  );
};

export default AddClassPage;
