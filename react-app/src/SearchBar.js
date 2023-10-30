/*
import React, { useState }  from "react";
import "./SearchBar.css";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function SearchBar({isSimple}) {
  const [str, setStr] = useState('');
  const handleFilterSearch = (e) => {
    e.preventDefault();
    const endpoint = "/search";
    const qwery = {str};
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(qwery), // formData is not defined in your code
    }).catch((error) => console.error("Error searching:", error));
  };

  const GetSimpleBarHtml = () => {
    return (
      <Form onSubmit={handleFilterSearch} className="d-flex">
        <Form.Group controlId="SearchBar">
          <Form.Control
            type="text"
            placeholder="search..."
          />
        </Form.Group>
      </Form>
    );
  };

  const GetAdvancedBarHtml = () => {
    return (
      <Form onSubmit={handleFilterSearch} className="d-flex">
        <Row>
          <Col sm={8}>
            <Form.Group controlId="SearchBar">
              <Form.Control
                type="text"
                placeholder="Search tutor, or subjects that interest you the most"
              />
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group as={Row} controlId="Filter">
              <Form.Label column sm={1}>
                by
              </Form.Label>
              <Col sm={10}>
                <Form.Select as="priority">
                  <option value="rel">Relevance</option>
                  <option value="lat">Latest</option>
                  <option value="rat">Rating</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Find
        </Button>
      </Form>
    );
  };
  return isSimple ? GetSimpleBarHtml() : GetAdvancedBarHtml();
}
export default SearchBar;
*/
/*
import React, { useState } from "react";
import "./SearchBar.css";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function SearchBar({ isSimple }) {
  const [str, setStr] = useState('');

  const handleFilterSearch = (e) => {
    e.preventDefault();
    const endpoint = "/search";
    const qwery = { str };
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(qwery),
    }).catch((error) => console.error("Error searching:", error));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const strval = event.target.value; // Get the value from the input field
      setStr(strval); // Update the 'str' state with the input value
      console.log('Enter Pressed');
      handleFilterSearch(event);
    }
  };

  const GetSimpleBarHtml = () => {
    return (
      <Form onSubmit={handleFilterSearch} className="d-flex">
        <Form.Group controlId="SearchBar">
          <Form.Control
            type="text"
            placeholder="search..."
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
      </Form>
    );
  };

  const GetAdvancedBarHtml = () => {
    return (
      <Form onSubmit={handleFilterSearch} className="d-flex">
        <Row>
          <Col sm={8}>
            <Form.Group controlId="SearchBar">
              <Form.Control
                type="text"
                placeholder="Search tutor, or subjects that interest you the most"
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group as={Row} controlId="Filter">
              <Form.Label column sm={1}>
                by
              </Form.Label>
              <Col sm={10}>
                <Form.Select as="priority">
                  <option value="rel">Relevance</option>
                  <option value="lat">Latest</option>
                  <option value="rat">Rating</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Find
        </Button>
      </Form>
    );
  };

  return isSimple ? GetSimpleBarHtml() : GetAdvancedBarHtml();
}

export default SearchBar;
*/

import React, { useState } from "react";
import "./SearchBar.css";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function SearchBar({ isSimple }) {
  const [str, setStr] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const strval = event.target.value; // Get the value from the input field
      setStr(strval); // Update the 'str' state with the input value
      console.log('Enter Pressed');
      handleFilterSearch(strval); // Pass the input value to the search function
    }
  };
  
  const handleFilterSearch = (searchStr) => {
    const endpoint = `/search?str=${searchStr}`; // Use a GET request with the query parameter
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => console.error("Error searching:", error));
  };
  

  const GetSimpleBarHtml = () => {
    return (
      <Form className="d-flex">
        <Form.Group controlId="SearchBar">
          <Form.Control
            type="text"
            placeholder="search..."
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
      </Form>
    );
  };

  const GetAdvancedBarHtml = () => {
    return (
      <Form className="d-flex">
        <Row>
          <Col sm={8}>
            <Form.Group controlId="SearchBar">
              <Form.Control
                type="text"
                placeholder="Search tutor, or subjects that interest you the most"
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group as={Row} controlId="Filter">
              <Form.Label column sm={1}>
                by
              </Form.Label>
              <Col sm={10}>
                <Form.Select as="priority">
                  <option value="rel">Relevance</option>
                  <option value="lat">Latest</option>
                  <option value="rat">Rating</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={handleFilterSearch}>
          Find
        </Button>
      </Form>
    );
  };

  return isSimple ? GetSimpleBarHtml() : GetAdvancedBarHtml();
}

export default SearchBar;
