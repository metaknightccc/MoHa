import React, { useState, useEffect } from "react";
import "./Template.css";
import logo from "./logoWithTxt.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";

import SearchBar from "./SearchBar";
import axios from "axios";

const loggedInOptions = {
  dashboard: "Dashboard",
  logout: "Sign Out",
}

const loggedOutOptions = {
  login: "Login",
  register: "Register",
}

const routeToState = {
  register: { isStudent: true },
};

function Template() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/dashboard')
        .then((response) => {
          if (response.status === 200) {
            setIsLogged(true);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setIsLogged(false);
          }
        });
    }
  }, []);

  return (
    <div className="Template">
      <div className="Header">
        <div className="Nav-Main">
          <div className="Nav-Main-Left">
            <Navbar expand="lg" style={{
              margin: "0px",
              padding: "0px",
            }}>
              <Navbar.Brand href="/">
                <img
                  src={'./assets/logo.png'}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                  variant="pills"
                  className="flex-grow-1 justify-content-evenly"
                  activeKey="/home"
                >
                  <Nav.Item>
                    <Nav.Link href="/" className="custom-link">
                      Home
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to={"/register"}
                      state={{ isStudent: false }}
                      className="custom-link"
                    >
                      Become a Tutor
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link href="/search" className="custom-link">
                      Explore
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link href="/about" className="custom-link">
                      About us
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link href="/contact" className="custom-link">
                      Contact us
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div className="Nav-Main-Right">
            <SearchBar isSimple={true} />
            <div className="avatar">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="avatar-dropdown"
                  variant="primary"
                >
                  <Image src={'./assets/nyu.jpg'}  roundedCircle fluid />
                </Dropdown.Toggle>

                <Dropdown.Menu align="right">
                  <Dropdown.Item disabled>
                    <div className="avatar-dropdown-header">

                      <Image src={'./assets/nyu.jpg'} roundedCircle fluid />

                      <div>
                        <div className="username">Username</div>
                        <div className="email">email@example.com</div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {/* <Dropdown.Item href="/dashboard">Profile</Dropdown.Item>
                  <Dropdown.Item href="/signout">Sign Out</Dropdown.Item> */}
                  {Object.entries(isLogged ? loggedInOptions : loggedOutOptions).map(([route, title]) => {
                    return (
                      <Dropdown.Item as={Link}  
                        to={`/${route}`}
                        state={routeToState[route]}
                        key={route}
                      >
                        {title}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div className="Body">
        <Outlet />
      </div>

      <div className="Footer">© 2023 Moha. All rights reserved.</div>
    </div >
  );
}

export default Template;
