import React from "react";
import "./HomePage.css";
import ClassSlot from "./ClassSlot";
import background from "./background.svg";

const HomePage = () => {
  return (
    <div className="HomePage">
      
      <div className="First">
        <img src={background} alt="background"/>
      </div>
      <div>
        <ClassSlot/>
      </div>
      <div>
        <ClassSlot/>
      </div>
      
      
      {/* <div className="item">
          <button className="rounded-pill" type="submit">Get it Started</button>
      </div> */}
      
    </div>
  );
};

export default HomePage;