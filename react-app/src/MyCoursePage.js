import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./MyCoursePage.css"

const MyCoursePage = ({ data }) => {

    const [courses, setCourses] = useState([]);
    const fetchInfo = async () => {
        try {
            const response = await axios.get('/dashboard/get_user_courses');
            setCourses(response.data.courses);
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
                {courses.map((course, index) => (
                    <ClassSlot 
                        key={index} 
                        props={{
                            id: course[0],
                            tutorId: course[1],
                            name: course[2],
                            subjectName: course[3],
                            type: course[4],
                            price: course[5],
                            description: course[6],
                            pic: course[7],
                            tutorName: course[8],
                        }} 
                    />
                ))}
            </Row>
            
        </Container>
        </div>
    );
    };
    
export default MyCoursePage;