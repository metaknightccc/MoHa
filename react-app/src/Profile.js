import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./Profile.css"

const Profile = ({ data }) => {
  const fileInputRef = useRef(null);

  const handleFileInput = () => {
    fileInputRef.current.click(); // This will open the file input dialog
  };
    return (
      <div>
        <Container>
          <Row>
            <Col xs={2} md={2}>
              <Image className="avatarImg" src={require('./assets/nyu.jpg')} roundedCircle fluid/>
            </Col>  
            <Col xs={2} md={5}>
              <DropdownButton as={ButtonGroup} title="Edit" id="bg-nested-dropdown">
                <Dropdown.Item eventKey="1" onClick={handleFileInput}>Change a photo</Dropdown.Item>
                <Dropdown.Item eventKey="2">Remove photo</Dropdown.Item>
              </DropdownButton>
              
            </Col>  
          </Row>
          <Row>
            <Container>
             <Row>
                <Col xs={2} md={5}>
                  <h1>Enrolled courses</h1>
                </Col>
             </Row>
             <Row>
                <Col xs={2} md={5}>
                    <ClassSlot 
                      imgName={"nyu.jpg"}
                      tutorName={"Esposito"}
                      courseName={"intro to react"}
                      courseDes={"a sample courseDes"}
                      // variant={"secondary"}
                    />
                </Col>
             </Row>
            </Container>
          </Row>
        </Container>
      </div>
    );
  };
  
  export default Profile;