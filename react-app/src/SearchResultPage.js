import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import SearchBar from "./SearchBar";
import "./SearchResultPage.css";
import ClassSlot from "./ClassSlot";
import axios from "axios";

function SearchResultPage() {
  const [searchResults, setSearchResults] = useState([]);


  const handleSearchBarCallback = (searchResults) => {
    setSearchResults(searchResults);
  };


  const fetchCourses = () => {
    const endpoint = "/search";
    axios
      .get(endpoint)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error searching:", error);
      });
  };

  const GetCarouselHtml = (numPerSlide = 3) => {
    const carouselItems = [];
    const arr = [];
    // turn searchResults into an array of arrays of length numPerSlide( the resting elements are in the last array which could have less than numPerSlide elements)
    for (let i = 0; i < searchResults.length; i += numPerSlide) {
      arr.push(
        searchResults.slice(
          i,
          i +
            (searchResults.length - i < numPerSlide
              ? searchResults.length - i
              : numPerSlide)
        )
      );
    }
    // turn the array of arrays into carousel items
    for (let i = 0; i < arr.length; i++) {
      carouselItems.push(
        <Carousel.Item key={i}>
          <div className="SearchResultPage">
            {arr[i].map((item) => (
              <ClassSlot
                imgName={"nyu.jpg"}
                tutorName={item.tutor_id}
                courseName={item.subject_name}
                courseDes={"a sample courseDes"}
              />
            ))}
          </div>
        </Carousel.Item>
      );
    }
    return carouselItems;
  };

  return (
    <div className="SearchContainer">
      <Container>
        <h2>Explore</h2>
        <SearchBar isSimple={false} cb={handleSearchBarCallback}/>
      </Container>
      <Container>
        <Carousel>{GetCarouselHtml(4)}</Carousel>
      </Container>
    </div>
  );
}

export default SearchResultPage;
