import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const AddClassPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    begin_time: "",
    end_time: "",
  });
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // const [enrolled_courses, setEnrolled_courses] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // const handleInputChange = (e) => {
  //   const { begin_time, end_time } = e.target;

  //   setFormData({
  //     ...formData,
  //   });
  // };

  useEffect(() => {
    if (location.state && location.state.formData !== null) {
      setFormData({...formData, ...location.state.formData});
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const fetchEnrolledClasses = async () => {
  //   try {
  //     const response = await axios("/course_class/get_enrolled_classes");
  //     if (response.status === 'success') {
  //       const enrolled_courses = await response.json();
  //       setEnrolled_courses(enrolled_courses);
  //     } else {
  //       console.error("Failed to fetch enrolled classes");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching enrolled classes:", error);
  //   }
  // };

  // const handleBeginTimeChange = (event) => {
  //   setBeginTime(event.target.value);
  // };

  // const handleEndTimeChange = (event) => {
  //   setEndTime(event.target.value);
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleTimeChange = (time) => {
  //   setSelectedTime(time.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
    axios
      .post("/course_class/purpose_class", formData)
      .then((response) => {
        // Handle the response data as needed
        console.log("Course added:", response.data);
        navigate(`/coursedes`, { state: { ...formData } });
      })
      .catch((error) => {
        console.error("Error adding course:", error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col}>
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            name="date"
            // value={selectedDate.toISOString().split('T')[0]}
            value={selectedDate}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Time:</Form.Label>
          <Form.Control
            type="time"
            name="begin_time"
            value={selectedTime}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Time:</Form.Label>
          <Form.Control
            type="time"
            name="end_time"
            value={selectedTime}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Class
        </Button>
      </Form>
    </div>
  );
};

export default AddClassPage;
