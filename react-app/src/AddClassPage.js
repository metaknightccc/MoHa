import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
// import DatePicker from "react-datepicker";

const AddClassPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: 0.0,
    description: "",
    course_pic: null,
    academic: false,
  });
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [enrolled_class, setEnrolled_class] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Use a conditional to check the input type
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  useEffect(() => {
    // Fetch enrolled classes when the component loads
    fetchEnrolledClasses();
  }, []);

  const fetchEnrolledClasses = async () => {
    try {
      const response = await fetch("/course_class/get_enrolled_classes"); 
      if (response.status === 'success') {
        const classes = await response.json();
        setEnrolled_class(classes);
      } else {
        console.error("Failed to fetch enrolled classes");
      }
    } catch (error) {
      console.error("Error fetching enrolled classes:", error);
    }
  };

  const handleBeginTimeChange = (event) => {
    setBeginTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
    axios
      .post("/course/add_course", formData)
      .then((response) => {
        // Handle the response data as needed
        console.log("Course added:", response.data);
        navigate(`/coursedes`, { state: { formData: formData } });
        //const id =  response.data.course_id;
        //setCourse_id(id);
        //console.log('Course ID:', course_id);
      })
      .catch((error) => {
        console.error("Error adding course:", error);
      });

    //fetchcourseid();
    //axios.post('/course/get_course_pic', course_id)
    //console.log('Form Data:', course_id);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="estimated hourly price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="course"
            value={formData.price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="estimated hourly price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
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
