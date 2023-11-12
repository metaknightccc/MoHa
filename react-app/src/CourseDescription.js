import React, { useState, useEffect, useRef } from "react";
import { ListGroup, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./Profile.css"

const CourseDescription = ({ data }) => {

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
        fetchInfo();
    }, []);

    return (
        <Container className="courseDes">
            <Row>
                <Col md={12}>
                    <h1>Course Description:{formData.course_description}</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Course id: {formData.course_id}</ListGroup.Item>
                        <ListGroup.Item>Course tutor id: {formData.tutor_id}</ListGroup.Item>
                        <ListGroup.Item>Course name: {formData.course_name}</ListGroup.Item>
                        <ListGroup.Item>Course subject: {formData.course_subject}</ListGroup.Item>
                        <ListGroup.Item>Course type: {formData.course_type}</ListGroup.Item>
                        <ListGroup.Item>Course price: {formData.course_price}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col lg={6}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <h1>Average Cost {formData.course_price}/h</h1>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
export default CourseDescription;