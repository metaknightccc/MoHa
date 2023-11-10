import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./Profile.css"

const Profile = ({ data }) => {
  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    try {
      const response = await axios.post('/dashboard/update_user_info', {
        firstname: formData.firstname,
        lastname: formData.lastname,
      });
      console.log('User info updated:', response.data);
    }
    catch (error) {
      console.error('Error updating user info:', error);
    }
    setShowSubmit(false);
    setShowForm(false);
    setShowForm2(false);
    await fetchInfo();
  };

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const handleEditClick = () => {
    setShowForm(true);
    setShowForm2(true);
    setShowSubmit(true);
  };

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
  });

  const [displayFirstname, setDisplayFirstname] = useState(formData.firstname);
  const [displayLastname, setDisplayLastname] = useState(formData.lastname);

  const fetchInfo = async () => {
    try {
      const response = await axios.get('/dashboard/get_user_info');
      setFormData({
        firstname: response.data.fn,
        lastname: response.data.ln,
        username: response.data.un,
        email: response.data.em,
        phone: response.data.ph,
      });
      setDisplayFirstname(response.data.fn);
      setDisplayLastname(response.data.ln);
    }
    catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [avatarPath, setAvatarPath] = useState('');

  const fetchAvatarPath = async () => {
    // axios.get('/dashboard/get_avatar_path')
    try {
      const response=axios.get('/dashboard/get_avatar_path')
      setAvatarPath((await response).data.path)
      // console.log("avatar path===", typeof avatarPath)
    }
    catch (error) {
      console.error('Error fetching avatar path:', error);
    }
  };

  useEffect(() => {
    fetchAvatarPath();
  }, []);

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
      const formData = new FormData();
      formData.append('fileaaaa', file);
      // const data = Object.fromEntries(formData);
      // console.log("form data===", file)
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
          <h1>Hi, {displayFirstname} {displayLastname}</h1>
        </Row>
        <Row>
          <Col xs={2} md={2}>
            <Image className="avatarImg" src={avatarPath||'./assets/nyu.jpg'} roundedCircle fluid/>
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
          {/* <Col xs={2} md={5}> */}
          <Form onSubmit={handleSubmit}>
            <Form.Label>Username:{formData.username}</Form.Label>
            <Form.Label>Name:{displayFirstname} {displayLastname}</Form.Label>
            <Button onClick={handleEditClick}>Edit</Button>{' '}
            {showForm && <Form.Control placeholder="First Name"  onChange={(e) => setFormData({...formData, firstname: e.target.value})} />}
            {showForm2 && <Form.Control placeholder="Last Name"  onChange={(e) => setFormData({...formData, lastname: e.target.value})} />} 
            {showSubmit && <Button type="submit">Save changes</Button>}{' '} 
          </Form>
          {/* </Col> */}
        </Row>
        <Row> 
          <ClassSlot/>
        </Row>
      </Container>
    </div>
  );
  };
  
  export default Profile;