import React, { useState, useEffect, useRef } from "react";
import { ListGroup, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CourseEnrollPage = () => {
    const location = useLocation();
    const [enrolled, setEnrolled] = useState(false);

    // Function to mimic an API call to enroll the user
    const enrollUser = () => {
        // Simulate API call
        setTimeout(() => {
            setEnrolled(true);
        }, 2000); // Set a delay to mimic an API response
    };

    useEffect(() => {
        // Trigger the enrollment function
        enrollUser();
    }, []);

    return (
        <Container>
            <h1>Enrolling in Course...</h1>
            {enrolled && <h3>Successfully Enrolled!</h3>}
        </Container>
    );
};

export default CourseEnrollPage;
