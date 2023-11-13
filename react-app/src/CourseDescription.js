import React, { useState, useEffect, useRef } from "react";
import { ListGroup, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./Profile.css"

const CourseDescription = ({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        course_id: '',
        tutor_id: '',
        course_name: '',
        course_subject: '',
        course_type: '',
        course_price: '',
        course_description: '',
    });
    const [isStudent, setIsStudent] = useState();

    const fetchInfo = async () => {
        try {
            const response = await axios.get(`/course/get_course_info?course_id=${location.state.course_id}`);
            setFormData({
                course_id: response.data.id,
                tutor_id: response.data.tutor_id,
                course_name: response.data.name,
                course_subject: response.data.subject_name,
                course_type: response.data.type,
                course_price: response.data.price,
                course_description: response.data.description,
            });
            setIsStudent(response.data.user_type==='student');
            console.log(isStudent);
            console.log(response.data.user_type);
        }
        catch (error) {
            console.error('Error fetching user info:', error);
        }
    };


    useEffect(() => {
        fetchInfo();
    }, []);
    const handleModify = () => {
        if(!isStudent){
            navigate(`/modcourse`, {state: { formData: formData  }});
        }
        else{
            navigate(`/courseenroll`, {state: { formData: formData  }});
        } 
        //navigate(`/modcourse/${formData.course_id}`); // Redirect to ModCoursePage with the course ID
    };

    // useEffect(() => {
    //     if (location.state && location.state.isStudent !== null) {
    //       setIsStudent(location.state.isStudent);
    //     }
    //   }, [location]);

    return (
        <Container className="courseDes">
            <Row>
                <Col md={12}>
                    {/* <h1>Course Description:{formData.course_description}</h1> */}
                    <h1>Course Name: {formData.course_name}</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Course id: {formData.course_id}</ListGroup.Item>
                        <ListGroup.Item>Course tutor id: {formData.tutor_id}</ListGroup.Item>
                        {/* <ListGroup.Item>Course name: {formData.course_name}</ListGroup.Item> */}
                        
                        <ListGroup.Item>Course subject: {formData.course_subject}</ListGroup.Item>
                        <ListGroup.Item>Course type: {formData.course_type}</ListGroup.Item>
                        <ListGroup.Item>Course price: {formData.course_price}</ListGroup.Item>
                        <ListGroup.Item>Course Description: {formData.course_description}</ListGroup.Item>
                        
                        {/* <ListGroup.Item>
                            <Button variant="primary" onClick={handleModify}>
                                Modify
                            </Button>
                        </ListGroup.Item> */}
                        <ListGroup.Item>
                        {isStudent ? (
                            <Button variant="primary" onClick={handleModify}>
                                    Enroll
                            </Button>
                            ) : (
                            <Button variant="primary" onClick={handleModify}>
                                    Edit
                            </Button>
                        )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col lg={6}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <h1>Hourly Estimated Cost: {formData.course_price}/h</h1>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
export default CourseDescription;