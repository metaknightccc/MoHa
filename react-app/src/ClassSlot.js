import React from "react";
import "./ClassSlot.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ClassSlot = ({imgName="nyu.jpg"}) => {

  return (
    <Card className="classCard" style={{ width: '50rem', height: '10rem' }}>
      <div className="cardContent">
        <Card.Img className="cardImage" variant="top" src={require('./assets/'+imgName)} style={{ width: '100px' }} />
        <Card.Body className="cardBody">
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            A random course
          </Card.Text>
        </Card.Body>
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