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

const ClassListPage = ({ data }) => {
  const [classlist, setClasslist] = useState([]);

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

  return (
    <div> 
      <Container>
       
      </Container>
    </div>
  );
};

export default ClassListPage;
