import React from "react";
import "./ClassSlot.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const ClassSlot = ({imgName="nyu.jpg",tutorName="Charles Pan",courseName="CS101",courseDes="RandomCourse", variant}) => {
 
  const cardType = variant ? `classCard classCard-${variant}` : "classCard";
  
  return (
    <Card className={cardType} style={{width:'18rem'}}>
      <Card.Img className="cardImage" variant="top" src={'./assets/'+imgName} />
      <Card.Body className="cardBody">
        <Link 
          to="/coursedes"
          state={{course_id: 1}}
        >
          <Card.Title>{courseName}</Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 text-muted">{tutorName}</Card.Subtitle>
        <Card.Text>
          {courseDes}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ClassSlot;

// hover
// divding line
// Parameter
// Jump
// fixed imgsize