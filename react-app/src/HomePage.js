import React from "react";
import "./HomePage.css";
import ClassSlot from "./ClassSlot";

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="ClassList">
        <ClassSlot 
          imgName="nyu.jpg"
          tutorName="John Doe"
          courseName="Math 101"
          courseDes="This is a basic math course."
        />
        <ClassSlot 
          imgName="nyu.jpg"
          tutorName="John Doe"
          courseName="Math 101"
          courseDes="This is a basic math course."
        />
        <ClassSlot 
          imgName="nyu.jpg"
          tutorName="John Doe"
          courseName="Math 101"
          courseDes="This is a basic math course."
        />
      </div>
      
      <div className="item">
          <button className="rounded-pill" type="submit">Get it Started</button>
        </div>
      
    </div>
  );
};

export default HomePage;