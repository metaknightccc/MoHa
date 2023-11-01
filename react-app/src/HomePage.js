import React from "react";
import "./HomePage.css";
import ClassSlot from "./ClassSlot";
import background from "./background.svg";
import Carousel from 'react-bootstrap/Carousel';

const HomePage = () => {
  return (
    <div className="wrap">
      <div className="bgContainer">
        <div className="First">
          <img src={background} className="banner" alt="background" />
          <div className="txt">
            <h2 className="wlc">Learn Together Grow Together</h2>
            <h1 className="title">find any desired courses here or become a tutor to help others</h1>
            <div className="button">Get started now</div>
          </div>
        </div>
      </div>
      <div>
        <Carousel interval={10000} pause={false}>
          <Carousel.Item>
            <div className="group">
            <div className="item">
              <img
                className="d-block w-100"
                src="./assets/nyu.jpg"
                alt="First slide"
              />
              <div className="title">Hello world</div>
            </div>

            <div className="item">
              <img
                className="d-block w-100"
                src="./assets/nyu.jpg"
                alt="First slide"
              />
              <div className="title">Hello world</div>
            </div>

            <div className="item">
              <img
                className="d-block w-100"
                src="./assets/nyu.jpg"
                alt="First slide"
              />
              <div className="title">Hello world</div>
            </div>

            <div className="item">
              <img
                className="d-block w-100"
                src="./assets/nyu.jpg"
                alt="First slide"
              />
              <div className="title">Hello world</div>
            </div>
            </div>
           
          </Carousel.Item>
          <Carousel.Item>
            <div className="group">
            <div className="item">
              <img
                className="d-block w-100"
                src="./assets/nyu.jpg"
                alt="First slide"
              />
              <div className="title">Hello world111</div>
            </div>

            <div className="item">
              <img
                className="d-block w-100"
                src="./assets/nyu.jpg"
                alt="First slide"
              />
              <div className="title">Hello world111</div>
            </div>

            <div className="item">
              <img
                className="d-block w-100"
                src="./assets/nyu.jpg"
                alt="First slide"
              />
              <div className="title">Hello world111</div>
            </div>

            <div className="item">
              <img
                className="d-block w-100"
                src="./assets/nyu.jpg"
                alt="First slide"
              />
              <div className="title">Hello world</div>
            </div>
            </div>
           
          </Carousel.Item>

          
         
        </Carousel>
      </div>
    </div>

  );
};

export default HomePage;