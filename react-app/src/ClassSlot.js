import React from "react";
import "./ClassSlot.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const ClassSlot = ({ props }) => {
  if (!props) props = { 
    description: "No description", 
    id: 1, 
    pic: "No pic", 
    name: "No name", 
    tutorName: "No tutor name", 
    variant: 'top' 
  };
  let { description, id, pic, name, tutorName, variant = 'top' } = props;
  if (!tutorName ){
    tutorName = props.tutor_name;
  };
  const cardType = variant ? `classCard classCard-${variant}` : "classCard";
  if (!tutorName) tutorName = "Not Given";
  return (
    <Card className={cardType} style={{ width: '18rem' }}>
      <Card.Img className="cardImage" variant={variant} src={`http://localhost:8080${pic}`} />
      <Card.Body className="cardBody">
        <Link
          to="/coursedes"
          state={{ course_id: id }}
        >
          <Card.Title>{name}</Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 text-muted">{tutorName}</Card.Subtitle>
        <Card.Text>
          {description}
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