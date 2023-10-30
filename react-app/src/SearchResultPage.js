import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import SearchBar from "./SearchBar";
import "./SearchResultPage.css";
import ClassSlot from "./ClassSlot";
import { useLocation } from "react-router-dom";

function SearchResultPage({ classes }) {
  const location = useLocation();
  let searchResults = classes ?? location.state?.searchResult;

  const fetchCourses = () => {
    const endpoint = "/search";
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          searchResults = response;
        } else {
          console.error("Error searching:", response.data.error);
          // Display the error message to the user (e.g., in a div element)
          //setError(response.data.error);
        }
      })
      .catch((error) => console.error("Error searching:", error));
  };

  if (!searchResults) {
    fetchCourses();
  }
  
  const GetCarouselHtml = () => {
    // display 3 classes per carousel item from searchResults
    const carouselItems = [];
    for (let i = 0; i < searchResults.length; i += 3) {
      const remaining = searchResults.length - i;
      carouselItems.push(
        <Carousel.Item>
          <div className="SearchResultPage">
            {remaining >= 3 ? (
              <>
                <ClassSlot courseDes={searchResults[i]} />
                <ClassSlot courseDes={searchResults[i+1]} />
                <ClassSlot courseDes={searchResults[i+2]} />
              </>
            ) : remaining === 2 ? (
              <>
                <ClassSlot courseDes={searchResults[i]} />
                <ClassSlot courseDes={searchResults[i+1]} />
              </>
            ) : (
              <>
                <ClassSlot courseDes={searchResults[i]} />
              </>
            )}
          </div>
        </Carousel.Item>
      );
    }
    return carouselItems;
  }


  return (
    <Container>
      <h2>Explore</h2>
      <SearchBar isSimple={false} />
      <Carousel>
        {GetCarouselHtml()}
      </Carousel>

    </Container>
  );
}

export default SearchResultPage;
