import React from "react";
import "./SearchResultPage.css";
import { Container, Form, Button } from "react-bootstrap";
// import ClassSlot from "./ClassSlot"; // Import ClassSlot component
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchBar from "./SearchBar";


/**
 *
 * @param {[]} array of search result of classes
 * @returns
 */
function SearchResultPage(classes) {


  return (
    <Container>
      <h1>Search Result</h1>

      <SearchBar isSimple={false} />

      <h2>{`Search Result: ${classes.length} found`}</h2>

      <div className="SearchResultPage">
        {[].map((classObj, index) => (
          // <ClassSlot />
          console.log(classObj)
        ))}
      </div>
    </Container>
  );
}

export default SearchResultPage;
