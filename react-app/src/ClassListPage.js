import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClassSlot from "./ClassSlot";
import Card from 'react-bootstrap/Card';

const ClassListPage = ({ data, userType }) => {
  const [classlist, setClasslist] = useState([]);
  const navigate = useNavigate();

  const fetchClassInfo = async () => {
    try {
      const response = await axios.get("/course_class/get_classes");
      setClasslist(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchClassInfo();
  }, []);

  const handleComment = (course_id, student_id, start_time, end_time) => {
    navigate("/Rating", {state: {course_id: course_id, student_id: student_id, start_time: start_time, end_time: end_time}});
  };

  const handlePurpose = (course_id, student_id, start_time, end_time, accept) => {
    // todo: send accept to backend
  };

  return (
    <div>
      <Container>
        {
          data && data.map((item) => {
            if(item.enroll == false && 
              ((!item.comfirm && userType === "tutor") || userType === "student") ){
              return (
                <Card>
                  <Card.Body>
                    <Card.Title>course ID: {item.course_id}</Card.Title>
                    <Card.Text>price: {item.price}</Card.Text>
                    {
                      userType === "tutor" &&
                      <>
                        <Button variant="primary" onClick={() => {
                          handlePurpose(item.course_id, item.student_id, item.start_time, item.end_time, true);
                        }}>Accept</Button>
                        <Button variant="primary" onClick={() => {
                          handlePurpose(item.course_id, item.student_id, item.start_time, item.end_time, false);
                        }}>Reject</Button>
                      </>
                    }
                    {
                      userType === "student" &&
                      <>
                        <Button variant="primary" onClick={() => {
                          handleComment(item.course_id, item.student_id, item.start_time, item.end_time);
                        }}>Comment</Button>
                        <a href="https://www.google.com" >Zoom</a>
                      </>
                    }
                  </Card.Body>
                </Card>
              );
            }
          })
        }
      </Container>
    </div>
  );
};

export default ClassListPage;
