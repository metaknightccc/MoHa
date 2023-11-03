import React, { useState } from "react";
import "./SearchBar.css";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

function SearchBar({ isSimple, cb = null }) {
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('rel');
  
  //const navigate = useNavigate();

  const handleSimpleFilterSearch = async (e) => {
    e.preventDefault();
    const endpoint = "/search";
    try {
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        if (cb) cb(response.data);
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleAdvancedFilterSearch = async (e) => {
    e.preventDefault();
    const endpoint = `/search?q=${query}&pri=${priority}`;
    try {
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        if (cb) cb(response.data);
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const GetSimpleBarHtml = () => {
    return (
      <Form onSubmit={handleSimpleFilterSearch} className="d-flex">
        <Form.Group controlId="SearchBar">
          <Form.Control type="text" placeholder="search..." onChange={(e) => setQuery(e.target.value)} />
        </Form.Group>
      </Form>
    );
  };

  const GetAdvancedBarHtml = () => {
    return (
      <Form onSubmit={handleAdvancedFilterSearch} className="d-flex">
        <Row className="search-align-row">
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
              <Form.Label column sm={2}>
                by
              </Form.Label>
              <Col sm={8}>
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
