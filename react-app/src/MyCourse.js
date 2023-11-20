import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./MyCourse.css"

const MyCourse = ({ data }) => {

    const [courses, setCourses] = useState([]);
    const fetchInfo = async () => {
        try {
            const response = await axios.get('/dashboard/get_user_courses');
            // console.log("xzzzzzppppzzzzzzzzzzzzz=============        ===",response.data);
            setCourses(response.data.courses);
            // console.log("xzzzzzzzzzzzzzzzzzz=============        ===",courses);
        }
        catch (error) {
            console.error('Error fetching user info:', error);
        }
    };


    useEffect(() => {
        fetchInfo();
    }, []);

    
    return (
        <div>
        <Container>
            <Row>
                <h1>Hi, 11</h1>
                {courses.map((course, index) => <ClassSlot key={index} course={course} />)}
            </Row>
            
        </Container>
        </div>
    );
    };
    
    export default MyCourse;