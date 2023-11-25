import React, { useState, useEffect, useRef } from "react";
import {
  ListGroup,
  Button,
  Container,
  Form,
  Col,
  Row,
  Nav,
  Image,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import "./ModCoursePage.css";

const ModCourse = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    course_id: "",
    course_tutor_id: "",
    course_name: "",
    course_subject: "",
    course_type: "",
    user_id: "",
    course_price: 0.0,
    course_description: "",
    course_pic: "",
  });
  //const [id, setId] = useState();

  const fetchInfo = async () => {
    try {
      const response = await axios.get(
        `/course/get_course_info?course_id=${location.state.course_id}`
      );
      setFormData({
        course_id: response.data.id,
        course_tutor_id: response.data.tutor_id,
        course_name: response.data.name,
        course_subject: response.data.subject,
        course_type: response.data.type,
        course_price: response.data.price,
        course_description: response.data.description,
        course_pic: response.data.course_pic,
        user_id : response.data.user_id,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      setFormData(location.state.formData);
    }
  }, []);

  // const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //         ...formData,
  //         [name]: value,

  //     });
  //     console.log("form data==",formData);
  // };
  const uploadImage = (event) => {
    // console.log("upload image===")
    const file = event.target.files[0];

    // setFormData({
    //   ...formData,
    //   file: file,
    // });

    if (file) {
      const picformData = new FormData();
      picformData.append("course_pic", file);
      picformData.append("course_id", formData.course_id);
      console.log("picformData", picformData);
      // const data = Object.fromEntries(formData);
      // console.log("form data===", file)
      axios
        .post("/course/get_course_pic", picformData)
        //axios.post('/course/get_course_pic', formData)
        .then((response) => {
          // Handle the response data as needed
          console.log("Image uploaded:", response.data);
          //setAvatar(`data:image/jpeg;base64,${response.data.image}`);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file separately
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Assuming you are allowing only single file selection
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Handle form submission here
  //     // Use formData to send the updated information to the server
  //     axios.post('/course/mod_course', formData)
  //   .then((response) => {
  //     // Handle the response data as needed
  //     console.log('Course modded:', response.data);
  //   })
  //   .catch((error) => {
  //     console.error('Error modding course:', error);
  //   });
  //     axios.post('/course/get_course_pic', formData)
  //     console.log('Form Data:', formData);
  //     navigate(`/coursedes`, {state: { course_id: formData.course_id }})
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here
    axios
      .post("/course/mod_course", formData)
      .then((response) => {
        // Handle the response data as needed
        console.log("Course modded:", response.data);

        // Log form data after the mod_course request completes
        console.log("Form Data:", formData);

        // Handle the get_course_pic request here if needed
        //return axios.post('/course/get_course_pic', formData);
      })
      .then((response) => {
        // Handle the get_course_pic response if needed
      })
      .catch((error) => {
        console.error("Error modding course:", error);
      });

    navigate(`/coursedes`, { state: { course_id: formData.course_id } });
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //         // Create a FormData object to handle file uploads
  //         const formDataWithFile = new FormData();

  //         // Append each form field to the FormData object
  //         Object.keys(formData).forEach((key) => {
  //             formDataWithFile.append(key, formData[key]);
  //         });

  //         // Append the file to the FormData object
  //         formDataWithFile.append('course_pic', formData.course_pic);

  //         // Send the FormData object to the server
  //         await axios.post('/course/get_course_pic', formDataWithFile);

  //         // Continue with the rest of your form submission logic
  //         axios.post('/course/mod_course', formData)
  //             .then((response) => {
  //                 console.log('Course modded:', response.data);
  //             })
  //             .catch((error) => {
  //                 console.error('Error modding course:', error);
  //             });

  //         navigate(`/coursedes`, { state: { course_id: formData.course_id } });
  //     } catch (error) {
  //         console.error('Error submitting form:', error);
  //     }
  // };

  return (
    <Container className="courseDes">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <h1>Course Name:</h1>
            <Form.Group controlId="courseName">
              <Form.Control
                type="text"
                name="course_name"
                value={formData.course_name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>Course id: {formData.course_id}</ListGroup.Item>
              <ListGroup.Item>
                Course tutor id: {formData.tutor_id}
              </ListGroup.Item>
              {/* <ListGroup.Item>
                                <Form.Group controlId="courseName">
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="course_name"
                                        value={formData.course_name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </ListGroup.Item> */}
              <ListGroup.Item>
                <Form.Group controlId="courseSubject">
                  <Form.Label>Course Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="course_subject"
                    value={formData.course_subject}
                    // onChange={handleInputChange}
                    readOnly
                  />
                </Form.Group>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                                <Form.Group controlId="courseType">
                                    <Form.Label>Course Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="course_type"
                                        value={formData.course_type}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </ListGroup.Item> */}
              <Form.Group controlId="courseType">
                <Form.Label>Course Type</Form.Label>
                <Form.Select
                  name="course_type"
                  value={formData.course_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select a type</option>
                  <option value="In-person">In-person</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </Form.Select>
              </Form.Group>
              <ListGroup.Item>
                <Form.Group controlId="coursePrice">
                  <Form.Label>Hourly Estimated Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="course_price"
                    value={formData.course_price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group controlId="courseDes">
                  <Form.Label>Course Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="course_description"
                    value={formData.course_description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="coursePic">
                  <Form.Label>Course Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="course_pic"
                    accept=".png, .jpg, .jpeg" // Set accepted file types
                    onChange={uploadImage}
                  />
                </Form.Group>
              </ListGroup.Item>
            </ListGroup>
            <Button type="submit">Save Changes</Button>
          </Col>
          <Col lg={6}>
            <Container>
              <Row>
                <Col md={6}>
                  <h1>Hourly Estimated Price {formData.course_price}/h</h1>
                  {formData.course_pic && (
                  <Image
                    className="courseImage"
                    src={`http://localhost:8080${formData.course_pic}`}
                    alt="Course Image"
                    fluid
                  />
                )}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default ModCourse;
