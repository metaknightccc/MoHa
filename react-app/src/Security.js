import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Security = () => {


    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post("/dashboard/change_password", {
                old_password: oldPassword,
                new_password: newPassword,
                confirm_new_password: confirmNewPassword,
            }).then((response) => {
                if (response.status === 200) {
                    alert(response.data.reason);
                } 
            });
        } catch (error) {
            console.error("Error changing password:", error);
        }  
    }


    return(
        <Container>
            <Row>
                <h1>Change Password</h1>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formBasicOldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Old Password" 
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter New Password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmNewPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm New Password" 
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Security;