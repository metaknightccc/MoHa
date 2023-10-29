import React from "react";
import "./ClassSlot.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const ClassSlot = ({imgName="nyu.jpg",tutorName,courseName,courseDes}) => {
  return (
    <Card className="classCard" style={{ width: '80%', height: '150px' }}>
      <div className="cardContent">
        <Card.Img className="cardImage" variant="top" src={require('./assets/'+imgName)} />
        <Card.Body className="cardBody">
        <Link to="/login">
          <Card.Title style={{textDecoration: 'None'}}>{courseName}</Card.Title>
        </Link>
          <Card.Text>
            {courseDes}
          </Card.Text>
        </Card.Body>
        <div className="tutorArea">
          <Card.Title>Tutor name</Card.Title>
          <Card.Text>
            {tutorName}
          </Card.Text>
        </div>
      </div>
    </Card>
  );
};

export default ClassSlot;

// hover
// divding line
// Parameter
// Jump
// fixed imgsize