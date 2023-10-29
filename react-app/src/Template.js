import React, { useState, useEffect } from "react";
import "./Template.css";
import logo from "./logoWithTxt.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from 'react-router-dom';

import SearchBar from "./SearchBar";

function Template() {
  const [showMenu, setShowMenu] = useState(false);
  //const [isSidebarVisible, setSidebarVisibility] = useState(true);

  return (
    <div className="Template">
      <div className="Header">
        <div className="Nav-Main">
          <div className="Nav-Main-Left">
            <Navbar expand="lg">
              <Navbar.Brand href="/">
                <img
                  src={logo}
                  width="30"
                  height="30"
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
                    <Nav.Link href="/" className="custom-link">Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/reg/register_tutor" className="custom-link">
                      Become a Tutor
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/about" className="custom-link">About us</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/contact" className="custom-link">Contact us</Nav.Link>
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
                >
                  <img src="path-to-your-avatar-image" className="avatar-img" />
                </Dropdown.Toggle>

                <Dropdown.Menu align="right">
                  <Dropdown.Item disabled>
                    <div className="avatar-dropdown-header">
                      <img
                        src="avatar-image-url"
                        alt="avatar"
                        className="avatar-image-small"
                      />
                      <div>
                        <div className="username">Username</div>
                        <div className="email">email@example.com</div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/signout">Sign Out</Dropdown.Item>
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
    </div>
  );
}

export default Template;
