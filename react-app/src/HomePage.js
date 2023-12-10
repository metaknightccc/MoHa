import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import ClassSlot from "./ClassSlot";
import background from "./background.svg";
import Carousel from 'react-bootstrap/Carousel';

const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get('/search')
      .then((response) => {
        setClasses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error searching:", error);
      });
  }, []);

  const getCarouselItems = (numPerSlide) => {
    const carouselItems = [];
    for (let i = 0; i < classes.length; i += numPerSlide) {
      const slideItems = classes.slice(i, i + numPerSlide);
      carouselItems.push(
        <Carousel.Item key={i}>
          <div className="group">
            {slideItems.map((item, index) => (
              <ClassSlot key={index} props={item} />
            ))}
          </div>
        </Carousel.Item>
      );
    }
    return carouselItems;
  };

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
          {loading ? <div>Loading...</div> : getCarouselItems(4)}
        </Carousel>
      </div>
    </div>

  );
};

export default HomePage;