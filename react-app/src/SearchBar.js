import React from "react";
import "./SearchBar.css";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function SearchBar({isSimple}) {
  const handleFilterSearch = (e) => {
    e.preventDefault();
    const endpoint = "/search";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // formData is not defined in your code
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
