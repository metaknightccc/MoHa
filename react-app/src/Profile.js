import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./Profile.css"

const Profile = ({ data }) => {

  // const [formData, setFormData] = useState({
  //   name: '',
  //   file: null,
  // });

  const handleInputChange = (e) => {
    document.getElementById('fileInput').click();
  };

  const uploadImage = (event) => {
    // console.log("upload image===")
    const file = event.target.files[0];

    // setFormData({
    //   ...formData,
    //   file: file,
    // });
    
    if (file){
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   const imageDataUrl = e.target.result;
      //   console.log(imageDataUrl);
      // };
      // // reader.readAsDataURL(file);
      // console.log("12345455")
    //   console.log("form data===", formData)
    //   axios.post('/dashboard/upload_image', formData)
    //     .then((response) => {
    //       // Handle the response data as needed
    //       console.log('Image uploaded:', response.data);
    //     })
    //     .catch((error) => {
    //       console.error('Error uploading image:', error);
    //     });
    //   console.log('Form Data:', formData);
    // }
      const formData = new FormData();
      formData.append('fileaaaa', file);
      // const data = Object.fromEntries(formData);
      console.log("form data===", file)
      axios.post('/dashboard/upload_image', formData)
        .then((response) => {
          // Handle the response data as needed
          console.log('Image uploaded:', response.data);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  }
  
  return (
    <div>
      <Container>
        <Row>
          <Col xs={2} md={2}>
            <Image className="avatarImg" src={require('./assets/nyu.jpg')} roundedCircle fluid/>
          </Col>  
          <Col xs={2} md={5}>
            <DropdownButton as={ButtonGroup} title="Edit" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1" onClick={handleInputChange}>Change a photo</Dropdown.Item>
              <Dropdown.Item eventKey="2">Remove photo</Dropdown.Item>
            </DropdownButton>
            <input 
              type="file" 
              id="fileInput" 
              style={{display: "none"}}
              onChange={uploadImage}
              accept="image/*"
            />
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