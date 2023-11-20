import React, { useState, useEffect, useRef } from "react";
import { ListGroup, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CourseEnrollPage = () => {
    const location = useLocation();
    const [enrolled, setEnrolled] = useState(false);
    const [formData, setFormData] = useState({
        course_id: '',
        course_tutor_id: '',
        course_name: '',
        course_subject: '',
        course_type: '',
        course_price: '',
        course_description: '',
        course_pic: null,
    });
    // Function to mimic an API call to enroll the user
    const enrollUser = () => {
        // Simulate API call
        setTimeout(() => {
            setEnrolled(true);
        }, 2000); // Set a delay to mimic an API response
        axios.post('/course/enroll_course', formData)
        .then((response) => {
            console.log('enroll status:', response.data);
            // Handle the get_course_pic response if needed
        })
    };
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
                course_pic: response.data.course_pic,
            });
        }
        catch (error) {
            console.error('Error fetching user info:', error);
        }
    };


    useEffect(() => {
        if(location.state !==null){
            setFormData(location.state.formData);
            enrollUser();
        }
        
    }, []);
    
    return (
        <Container>
            <h1>Enrolling in Course...</h1>
            {enrolled && <h3>Successfully Enrolled!</h3>}
        </Container>
    );
};

export default CourseEnrollPage;
