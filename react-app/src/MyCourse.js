import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./MyCourse.css"

const MyCourse = ({ data }) => {
    // const [formData, setFormData] = useState({
    //     firstname: '',
    //     lastname: '',
    //     username: '',
    //     email: '',
    //     phone: '',
    // });
    const fetchInfo = async () => {
        try {
            const response = await axios.get('/dashboard/get_user_courses');
            console.log("xzzzzzzzzzzzzzzzzzz=============        ===");
            // setFormData({
            //     firstname: response.data.fn,
            //     lastname: response.data.ln,
            //     username: response.data.un,
            //     email: response.data.em,
            //     phone: response.data.ph,
            // });
            
        }
        catch (error) {
            console.error('Error fetching user info:', error);
            console.log("xppzzzzzzzzzzzzzzzzzz=============        ===");
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
            </Row>
            
        </Container>
        </div>
    );
    };
    
    export default MyCourse;