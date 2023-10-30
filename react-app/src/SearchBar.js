import React, { useState } from "react";
import "./SearchBar.css";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

function SearchBar({ isSimple }) {
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('rel');
  
  const navigate = useNavigate();

  const handleSimpleFilterSearch = (e) => {
    e.preventDefault();
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
      navigate("/search", { state: { searchResults: data } });
    })
    .catch((error) => console.error("Error searching:", error));
  };

  const handleAdvancedFilterSearch = (e) => {
    e.preventDefault();
    const endpoint = `/search?q=${query}&pri=${priority}}`;
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
      navigate("/search", { state: { searchResults: data } });
    })
    .catch((error) => console.error("Error searching:", error));
  };

  const GetSimpleBarHtml = () => {
    return (
      <Form onSubmit={handleSimpleFilterSearch} className="d-flex">
        <Form.Group controlId="SearchBar">
          <Form.Control type="text" placeholder="search..." onChange={(e) => setQuery(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    );
  };

  const GetAdvancedBarHtml = () => {
    return (
      <Form onSubmit={handleAdvancedFilterSearch} className="d-flex">
        <Row>
          <Col sm={8}>
            <Form.Group controlId="SearchBar">
              <Form.Control
                type="text"
                placeholder="Search tutor, or subjects that interest you the most"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col sm={4}>
            <Form.Group as={Row} controlId="Filter">
              <Form.Label column sm={1}>
                by
              </Form.Label>
              <Col sm={10}>
                <Form.Select as="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
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
