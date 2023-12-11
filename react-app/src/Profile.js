import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Container, Form, Col, Row, Nav, Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
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
      // setDisplayAvatar(`http://localhost:8080${response.data.image}`);
      // setAvatar(`http://localhost:8080${response.data.image}`)
    }
    catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [avatar, setAvatar] = useState('');

  const fetchAvatar = async () => {
    // axios.get('/dashboard/get_avatar_path')
    try {
      const response=await axios.get('/dashboard/get_avatar')
      setAvatar(`data:image/jpeg;base64,${response.data.image}`);
      // console.log("avatar path===", avatar)
    }
    catch (error) {
      console.error('Error fetching avatar path:', error);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    document.getElementById('fileInput').click();
    handleShow();
  };

  const uploadImage = async (event) => {
    // console.log("upload image===")
    const file = event.target.files[0];


    if (file){
      const formData = new FormData();
      formData.append('user_pic', file);
      // const data = Object.fromEntries(formData);
      // console.log("form data===", file)
      axios.post('/dashboard/upload_image', formData)
        .then((response) => {
          // Handle the response data as needed
          console.log('Image uploaded:', response.data);
          setAvatar(`data:image/jpeg;base64,${response.data.image}`);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };





    
  //   // if (file){
  //   //   const Temp = new FormData();
  //   //   Temp.append('user_pic', file);
  //   //   // console.log("form data===", formData_new);
  //   //   // const data = Object.fromEntries(formData);
  //   //   // console.log("form data===", file)
  //   //   axios.post('/dashboard/upload_image', Temp)
  //   //     .then((response) => {
  //   //       // Handle the response data as needed
  //   //       console.log('Image uploaded:', response.data);
  //   //       setAvatar(`http://localhost:8080${response.data.image}`);
  //   //     })
  //   //     .catch((error) => {
  //   //       console.error('Error uploading image:', error);
  //   //     });
  //   // }
  // }
  
  return (
    <div>
      <Container>
        {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="avatar-section">
              <h2 className="mb-3">Avatar Editor Demo</h2>
              <p>Drag and Drop an Image:</p>
              <Dropzone onDrop={handleDrop} noClick noKeyboard>
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone" {...getRootProps()}>
                    <AvatarEditor
                      ref={editorRef}
                      color={[200, 200, 200, 0.6]}
                      scale={scale}
                      width={250}
                      crossOrigin="anonymous"
                      height={250}
                      image={originalImage}
                      rotate={rotate}
                      position={position}
                      onPositionChange={handlePositionChange}
                    />
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
              <Form className="avatar-form" onSubmit={handleSubmit}>
                <Form.Group className="w-100 my-3" controlId="upload">
                  <Form.Label className="file-btn btn btn-primary">
                    Upload
                    <Form.Control
                      className="file-input-hidden"
                      type="file"
                      onChange={handleAdd}
                      accept="image/*"
                    />
                  </Form.Label>
                </Form.Group>
                <Form.Group className="w-100 mb-3" controlId="zoom">
                  <Form.Label>Zoom</Form.Label>
                  <Form.Control
                    type="range"
                    onChange={handleZoom}
                    min={1}
                    max={2}
                    step={0.01}
                    defaultValue={scale}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rotate">
                  <Form.Label className="w-100">Rotate</Form.Label>
                  <Button onClick={() => handleRotate("left")} className="mr-3">
                    Left
                  </Button>
                  <Button onClick={() => handleRotate("right")}>Right</Button>
                </Form.Group>
                <Button className="mt-5" type="submit">
                  Crop / Save
                </Button>
              </Form>
            </div>
            <ul>
              <li>{`Image: ${
                typeof originalImage === "object" ? originalImage.name : originalImage
              }`}</li>
              <li>{`Zoom: ${scale}`}</li>
              <li>{`Rotate: ${rotate}°`}</li>
              <li>{`Position X: ${+position.x.toFixed(5)}`}</li>
              <li>{`Position Y: ${+position.y.toFixed(5)}`}</li>
              {croppedImage && (
                <>
                  <li className="mb-3">Cropped Image:</li>
                  <Image alt="cropped" src={croppedImage} />
                </>
              )}
            </ul>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> */}
        <Row>
          <h1>Hi, {displayFirstname} {displayLastname}</h1>
        </Row>
        <Row>
          <Col xs={2} md={2}>
          <Image 
              className="avatarImg" 
              src={avatar || './assets/nyu.jpg'} 
              roundedCircle 
              fluid
              style={{
                  width: '100px', // Set your desired width
                  height: '100px', // Set your desired height
                  objectFit: 'cover' // Ensures the image covers the area without stretching
              }}
          />

          </Col>  
          <Col xs={2} md={5}>
            <DropdownButton as={ButtonGroup} title="Edit" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1" onClick={handleInputChange}>Change a photo</Dropdown.Item>
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
      </Container>
    </div>
  );
  };
  
  export default Profile;