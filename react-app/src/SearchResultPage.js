import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import SearchBar from "./SearchBar";
import "./SearchResultPage.css";
import ClassSlot from "./ClassSlot";
import { useLocation } from "react-router-dom";

function SearchResultPage() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(location.state?.searchResults || []);

  useEffect(() => {
    if (!searchResults.length) {
      fetchCourses();
    }
  }, [searchResults]);

  const fetchCourses = () => {
    const endpoint = "/search";
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Failed to fetch search results');
      }
    })
    .then((data) => {
      setSearchResults(data);
    })
    .catch((error) => console.error("Error searching:", error));
  };

  const GetCarouselHtml = () => {
    const carouselItems = [];
    for (let i = 0; i < searchResults.length; i += 3) {
      const remaining = searchResults.length - i;
      carouselItems.push(
        <Carousel.Item key={i}>
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
              <ClassSlot courseDes={searchResults[i]} />
            )}
          </div>
        </Carousel.Item>
      );
    }
    return carouselItems;
  };

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
