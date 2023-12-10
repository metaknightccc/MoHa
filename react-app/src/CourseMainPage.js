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
//import "./Profile.css"
import "./CourseDescription.css";

const CourseMain = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [formData, setFormData] = useState({
  //   course_id: "",
  //   tutor_id: "",
  //   user_id: "",
  //   course_name: "",
  //   course_subject: "",
  //   course_type: "",
  //   course_price: 0.0,
  //   course_description: "",
  //   course_pic: "",
  // });
  const [formData, setFormData] = useState({
    course_id: "",
    tutor_id: "",
    user_id: "",
    course_name: "",
    course_subject: "",
    course_type: "",
    course_price: 0.0,
    course_description: "",
    course_pic: "",
    is_student: false,
    is_enrolled: false,
    zoom_id: "",
  });
  // const [course_class, setCourse_class] = useState({ //todo: cannot do like this, need a nother component
  //   begin_time: "", //format by .toISOstring()
  //   end_time: "",
  //   t_begin_time: "",
  //   t_end_time: "",
  //   duration: "",
  //   normal: true,
  //   side_note: "",
  //   taken: false,
  //   price: 0.0,
  //   quant_rating : 0.0,
  //   review: "",


  // });
  const [course_class,setCourse_class] =  useState(); 
  const [isStudent, setIsStudent] = useState();
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  // const fetchInfo = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/course/get_course_info?course_id=${location.state.course_id}`
  //     );
  //     setFormData({
  //       course_id: response.data.id,
  //       tutor_id: response.data.tutor_id,
  //       course_name: response.data.name,
  //       course_subject: response.data.subject_name,
  //       course_type: response.data.type,
  //       course_price: response.data.price,
  //       course_description: response.data.description,
  //       course_pic: response.data.course_pic,
  //     });
  //     setIsStudent(response.data.user_type === "student");
  //     setIsEnrolled(response.data.is_enrolled === true);
  //     console.log(isStudent,"; ",isEnrolled);
  //     console.log(response.data.user_type);
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //   }
  // };

  // useEffect(() => {
    

  // }, []);

  const fetchInfo = async () => {
    if (location.state !== null) {
    setFormData(location.state.formData);
    }
    console.log("formdata currently is:",formData);
    //onst course_id_s = new FormData();
    //course_id_s.append('course_id',location.state.formData.course_id);
    //axios.post('/course/get_course_class',{course_id: location.state.formData.course_id});
    // try {
    //   const course_classes = await axios.get(
    //     `/course/get_course_info?get_course_info=${location.state.course_id}`
    //   )
    // }
    // catch (error) {
    //   console.error("Error fetching courseclass:", error);
    // }
    // setCourse_class(course_classes)
    // console.log("course_classes=",course_class);
    try{
      const response = await axios.get(`/course/get_course_class?course_id=${location.state.formData.course_id}`
      );
      // setCourse_class({
      //   begin_time: response.data.begin_time,
      //   end_time: response.data.end_time,
      //   t_begin_time: response.data.t_begin_time,
      //   t_end_time: response.data.t_end_time,
      //   duration: response.data.duration,
      //   normal: response.data.normal,
      //   side_note: response.data.side_note,
      //   taken: response.data.taken,
      //   price: response.data.price,
      //   quant_rating : response.data.quant_rating,
      //   review: response.data.review,
      // });
      setCourse_class(response.course_class);
    }
    catch (error) {
      console.error("Error fetching course class:", error);
    }
    console.log("course_class=",course_class);
  };

  const handleClassClick = (course_class) => {
    navigate(`/modcourseclass`, { state: { course_class: course_class } });
  };
  useEffect(() => {
    fetchInfo();
  }, [navigate,location]); 

  const handleModify = () => {

      navigate(`/addclass`, { state: { formData: formData } });

    //navigate(`/modcourse/${formData.course_id}`); // Redirect to ModCoursePage with the course ID
  };

  const handleRating = () => {
    navigate(`/rating`, { state: { course_class: course_class } });
  };

//   useEffect(() => {
//     // Check if the user is a student and already enrolled
//     if (isStudent && isEnrolled) {
//       // If true, navigate to the course_main page
//       navigate("/course_main");
//     }
//   }, [isStudent, isEnrolled, navigate]);

//   const handleModify = () => {
//     if (!isStudent) {
//       navigate(`/modcourse`, { state: { formData: formData } });
//     } else {
//       navigate(`/courseenroll`, { state: { formData: formData } });
//     }
//     //navigate(`/modcourse/${formData.course_id}`); // Redirect to ModCoursePage with the course ID
//   };

  // useEffect(() => {
  //     if (location.state && location.state.isStudent !== null) {
  //       setIsStudent(location.state.isStudent);
  //     }
  //   }, [location]);

  return (
    <Container className="courseDes">
      <Row>
        <Col md={12}>
          {/* <h1>Course Description:{formData.course_description}</h1> */}
          <h1>Course Main Page</h1>
          <h1>Course Name: {formData.course_name}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>Course id: {formData.course_id}</ListGroup.Item>
            <ListGroup.Item>
              Course tutor id: {formData.tutor_id}
            </ListGroup.Item>
            {/* <ListGroup.Item>Course name: {formData.course_name}</ListGroup.Item> */}

            <ListGroup.Item>
              Course subject: {formData.course_subject}
            </ListGroup.Item>
            <ListGroup.Item>Course type: {formData.course_type}</ListGroup.Item>
            <ListGroup.Item>
              Course price: {formData.course_price}
            </ListGroup.Item>
            <ListGroup.Item>
              Zoom Link: {formData.zoom_id}
            </ListGroup.Item>
            <ListGroup.Item>
              Course Description: {formData.course_description}
            </ListGroup.Item>

            {/* <ListGroup.Item>
                            <Button variant="primary" onClick={handleModify}>
                                Modify
                            </Button>
                        </ListGroup.Item> */}
            {/* <ListGroup.Item>
              {isStudent ? (
                <Button variant="primary" onClick={handleModify}>
                  Enroll
                </Button>
              ) : (
                <Button variant="primary" onClick={handleModify}>
                  Edit
                </Button>
              )}
            </ListGroup.Item> */}
          </ListGroup>
        </Col>
        <Col lg={6}>
          <Container>
            <Row>
              <Col md={6}>
                <h1>Hourly Estimated Cost: {formData.course_price}/h</h1>
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
            {/* <Row>
              <Button
                onClick={() => handleRating()}>
              </Button>
            </Row> */}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h2>Course Classes</h2>
          <ListGroup>
            {course_class?.map((course_class) => (
              <ListGroup.Item
                key={course_class.class_id} // Replace 'class_id' with the actual key in your class object
                action
                onClick={() => handleClassClick(course_class)}
              >
                <p>Begin Time: {course_class.begin_time}</p>
                <p>End Time: {course_class.end_time}</p>
                <p>Duration: {course_class.duration}</p>
                <p>Normal: {course_class.normal}</p>
                <p>Side Note: {course_class.side_note}</p>
                <p>Taken: {course_class.taken}</p>
                {/* <p>Price: {course_class.price}</p>
                <p>Quant Rating: {course_class.quant_rating}</p>
                <p>Review: {course_class.review}</p> */}
                {/* Add other class information as needed */}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="primary" onClick={handleModify}>
            Add more Class?
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default CourseMain;
