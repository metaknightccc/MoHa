import React, { useState, useEffect, useRef } from "react";
import { Card, Modal, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const About = () => {

    const navigate = useNavigate();

    return(
        <Container>
            <Row>
                <h1>About Us</h1>
            </Row>
            <Row>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Charles Pan</Card.Title>
                        <Card.Text>
                            pc3723@nyu.edu
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Michael Shuai</Card.Title>
                        <Card.Text>
                            m.shuai@nyu.edu
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Nick Li</Card.Title>
                        <Card.Text>
                            ql2015@nyu.edu
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Yifan Sun</Card.Title>
                        <Card.Text>
                            ys4325@nyu.edu
                        </Card.Text> 
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Col>
                    
                </Col>
            </Row>
        </Container>
    );
}

export default About;