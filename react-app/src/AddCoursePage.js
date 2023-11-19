import React, { useState, useEffect } from 'react';
//import { ListGroup, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import './AddCoursePage.css';
import { Form, Button } from 'react-bootstrap';

const AddCoursePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: 0.0,
    description: '',
    course_pic: null,
    academic: false,
  });
  const [course_id, setCourse_id] = useState('');

  const [isNewSubject, setIsNewSubject] = useState(false); // State for the "New Subject?" checkbox
  const [existingSubjects, setExistingSubjects] = useState([]); // State to store existing subjects

  useEffect(() => {
    // Fetch existing subjects when the component loads
    fetchExistingSubjects();
  }, []);

  const fetchExistingSubjects = async () => {
    try {
      const response = await fetch('/course/get_existing_subjects');
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Use a conditional to check the input type
    const inputValue = type === 'checkbox' ? checked : value;
  
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
    axios.post('/course/add_course', formData)
      .then((response) => {
        // Handle the response data as needed
        console.log('Course added:', response.data);
        navigate(`/dashboard`, {state: { formData: formData  }});
        //const id =  response.data.course_id;
        //setCourse_id(id);
        //console.log('Course ID:', course_id);
      })
      .catch((error) => {
        console.error('Error adding course:', error);
      });
      
      //fetchcourseid();
    //axios.post('/course/get_course_pic', course_id)
    //console.log('Form Data:', course_id);
  };

  // const fetchcourseid = (e) =>{
  //   try {
  //     const response =  fetch('/course/add_course');
  //     if (response.ok) {
  //       const id =  response.json(course_id);
  //       setCourse_id(id);
  //     } else {
  //       console.error('Failed to fetch course ID');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching ID', error);
  //   }
  // };
  

  return (
    <div className="addClass-page">
      
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="pic">
        <Form.Label>Course Picture</Form.Label>
        <Form.Control
          type="file"
          name="course_pic"
          accept=".png, .jpg, .jpeg" // Set accepted file types
          onChange={handleInputChange}
        />
      </Form.Group>

        <Form.Group controlId="course name">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        {/* <Form.Group controlId="type(online, in-person, etc)">
          <Form.Label>Class Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </Form.Group> */}
        <Form.Group controlId="type">
          <Form.Label>Class Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="">Select a type</option>
              <option value="In-person">In-person</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </Form.Select>
        </Form.Group>

        <Form.Group controlId="estimated hourly price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="course description">
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

export default AddCoursePage;
