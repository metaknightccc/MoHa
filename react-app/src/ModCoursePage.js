import React, { useState, useEffect, useRef } from "react";
import { ListGroup, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./Profile.css"

const ModCourse = ({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        course_id: '',
        course_tutor_id: '',
        course_name: '',
        course_subject: '',
        course_type: '',
        course_price: '',
        course_description: '',
    });
    //const [id, setId] = useState();

    const fetchInfo = async () => {
        try {
            const response = await axios.get(`/course/get_course_info?course_id=${location.state.course_id}`);
            setFormData({
                course_id: response.data.id,
                course_tutor_id: response.data.tutor_id,
                course_name: response.data.name,
                course_subject: response.data.subject,
                course_type: response.data.type,
                course_price: response.data.price,
                course_description: response.data.description,
            });
        }
        catch (error) {
            console.error('Error fetching user info:', error);
        }
    };


    useEffect(() => {
        if(location.state !==null){
            setFormData(location.state.formData);
        }
        
    }, []);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        // Use formData to send the updated information to the server
        axios.post('/course/mod_course', formData)
      .then((response) => {
        // Handle the response data as needed
        console.log('Course modded:', response.data);
      })
      .catch((error) => {
        console.error('Error modding course:', error);
      });
        axios.post('/course/get_course_pic', formData)
        console.log('Form Data:', formData);
        navigate(`/coursedes`, {state: { course_id: formData.course_id }})
    };


    return (
        <Container className="courseDes">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={12}>
                        <h1>Course Name:</h1>
                        <Form.Group controlId="courseName">
                            <Form.Control
                                type="text"
                                name="course_name"
                                value={formData.course_name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Course id: {formData.course_id}</ListGroup.Item>
                            <ListGroup.Item>Course tutor id: {formData.tutor_id}</ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Form.Group controlId="courseName">
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="course_name"
                                        value={formData.course_name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Form.Group controlId="courseSubject">
                                    <Form.Label>Course Subject</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="course_subject"
                                        value={formData.course_subject}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Form.Group controlId="courseType">
                                    <Form.Label>Course Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="course_type"
                                        value={formData.course_type}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Form.Group controlId="coursePrice">
                                    <Form.Label>Hourly Estimated Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="course_price"
                                        value={formData.course_price}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Form.Group controlId="courseDes">
                                    <Form.Label>Course Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="course_description"
                                        value={formData.course_description}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </ListGroup.Item>
                        </ListGroup>
                        <Button type="submit">Save Changes</Button>
                        
                    </Col>
                    <Col lg={6}>
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <h1>Hourly Estimated Price {formData.course_price}/h</h1>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};
export default ModCourse;