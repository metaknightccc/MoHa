import React from "react";
import "./HomePage.css";
import ClassSlot from "./ClassSlot";

const HomePage = () => {
  return (
    <div className="HomePage">
      <h1>Home Page</h1>
      <div className="item">
        <button className="rounded-pill" type="submit">Get it Started</button>
      </div>
      <div className="ClassList">
        <ClassSlot />
      </div>
    </div>
  );
};

export default HomePage;