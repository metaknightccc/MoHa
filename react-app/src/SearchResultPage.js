import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./SearchResultPage.css";
import ClassSlot from "./ClassSlot";

function SearchResultPage({ classes }) {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch list of courses when the user clicks "explore" on navbar
    const fetchCourses = async () => {
      // Replace the endpoint with the correct API endpoint for fetching courses
      const endpoint = "/search";
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Extract search query from URL query parameters
    const searchQuery = new URLSearchParams(location.search).get("query");
    if (searchQuery) {
      // Fetch search results if there is a search query
      const fetchSearchResults = async () => {
        // Replace the endpoint with the correct API endpoint for searching courses
        const endpoint = `/search?query=${searchQuery}`;
        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetchSearchResults();
    } else {
      // Fetch list of courses when there is no search query
      fetchCourses();
    }
  }, [location.search]);

  return (
    <Container>
      <h2>Explore</h2>
      <SearchBar isSimple={false} />
        <Carousel>
          <Carousel.Item>
            <div className="SearchResultPage">  
              <ClassSlot imgName={"nyu.jpg"} />
              <ClassSlot imgName={"nyu.jpg"} />
              <ClassSlot imgName={"nyu.jpg"} />
            </div>  
          </Carousel.Item>

          <Carousel.Item>
            <div className="SearchResultPage">  
              <ClassSlot imgName={"nyu.jpg"} />
              <ClassSlot imgName={"nyu.jpg"} />
              <ClassSlot imgName={"nyu.jpg"} />
            </div>  
          </Carousel.Item>

          <Carousel.Item>
            <div className="SearchResultPage">  
              <ClassSlot imgName={"nyu.jpg"} />
              <ClassSlot imgName={"nyu.jpg"} />
              <ClassSlot imgName={"nyu.jpg"} />
            </div>  
          </Carousel.Item>

          
        </Carousel>

      {/* {searchResults.length > 0 ? (
        <>
          <h2>{`Search Result: ${searchResults.length} found`}</h2>
          <div className="SearchResultPage">
            {searchResults.map((classObj, index) => (
              // Replace the below line with the ClassSlot component once it is developed
              <ClassSlot />
              // <div key={index}>{classObj.name}</div>
            ))}
          </div>
        </>
      ) : (
        <div className="SearchResultPage">
          {courses.map((course, index) => (
            // Replace the below line with the ClassSlot component once it is developed
            <ClassSlot />
            // <div key={index}>{course.name}</div>
          ))}
        </div>
      )} */}
    </Container>
  );
}

export default SearchResultPage;
