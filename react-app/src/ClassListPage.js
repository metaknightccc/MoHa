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
import "./ClassListPage.css";
import Card from 'react-bootstrap/Card';
import ToggleButton from 'react-bootstrap/ToggleButton';

const sliceTime = (time) => {
  return time.slice(0, 10) + " " + time.slice(11, 19);
}
const ClassListPage = ({ data, userType }) => {
  const [classlist, setClasslist] = useState(data);
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

  const handleComment = (course_id, student_id, begin_time, end_time) => {
    navigate("/Rating", {
      state:
        { course_class: { course_id: course_id, student_id: student_id, begin_time: begin_time, end_time: end_time } }
    });
  };

  const handlePurpose = (course_id, student_id, begin_time, end_time, accept) => {
    axios.post("/course_class/confirm_class", {
      course_id: course_id,
      student_id: student_id,
      begin_time: begin_time,
      end_time: end_time,
      confirmed: accept
    }).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        alert(`You've ${accept ? "accepted" : "rejected"} the class purpose!`);
        window.location.reload();
      }
    }).catch((error) => {
      console.error("Error confirming class:", error);
    });
  };

  return (
    <div>
      <Container>
        {
          data && data.map((item) => {
            if (item.enroll == false &&
              ((!item.comfirm && userType === "tutor") || userType === "student")) {
              return (
                <Card>
                  <Card.Body className="classslot">
                    <div className="classtitle">
                      <Card.Title>course name: {item.name}</Card.Title>
                      <Card.Text>Price: {item.price}, Begin: {sliceTime(item.begin_time)}, End: {sliceTime(item.end_time)}</Card.Text>
                    </div>
                    {
                      userType === "tutor" &&
                      <div className="classcontent">
                        {/* <Button variant="primary" onClick={() => {
                          handlePurpose(item.course_id, item.student_id, item.begin_time, item.end_time, true);
                        }}>Accept</Button>
                        <Button variant="primary" onClick={() => {
                          handlePurpose(item.course_id, item.student_id, item.begin_time, item.end_time, false);
                        }}>Reject</Button> */}

                        <ButtonGroup type="checkbox" defaultValue={[1, 3]}>
                          <ToggleButton variant={item.confirmed ? "success" : "outline-success"}
                            value={true}
                            onClick={() => {
                              handlePurpose(item.course_id, item.student_id, item.begin_time, item.end_time, true);
                            }}
                          >Accept</ToggleButton>
                          <ToggleButton variant={item.confirmed ? "outline-danger" : "danger"}
                            value={false}
                            onClick={() => {
                              handlePurpose(item.course_id, item.student_id, item.begin_time, item.end_time, false);
                            }}
                          >Reject</ToggleButton>
                        </ButtonGroup>
                      </div>
                    }
                    {
                      userType === "student" &&
                      <div className="classcontent">
                        {
                          (item.review == "User left with a good impression!" || item.review == "") ?
                            <Button variant="primary" onClick={() => {
                              handleComment(item.course_id, item.student_id, item.begin_time, item.end_time);
                            }}>Comment</Button> : <Button variant="primary">Rated ✓</Button>
                        }
                        <a href={item.zoom_id ? item.zoom_id : "https://www.google.com"} >Zoom</a>
                      </div>
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
