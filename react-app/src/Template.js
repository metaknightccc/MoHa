import React, { useState, useEffect } from "react";
import "./Template.css";
import useToken from "./hook/useToken";
import logo from "./logoWithTxt.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import axios from "axios";

const pagesLinks = {
  Home: '/',
  Dashboard: '/dashboard',
  Logout: '/logout',
  Login: '/login',
  Register: '/register'
};

const loggedInOptions = ['Dashboard', 'Logout'];
const loggedOutOptions = ['Login', 'Register'];

const routeToState = {
  "/register": { isStudent: true },
};

function Template() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token] = useToken();
  const [isLogged, setIsLogged] = useState(false);
  const [settings, setSettings] = useState(loggedOutOptions);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_pic: "",

  });

  useEffect(() => {
    // const token = localStorage.getItem('token');

    axios.get('/dashboard')
      .then((response) => {
        if (response.status === 200) {
          setIsLogged(true);
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          setIsLogged(false);
        }
      });

  }, [token, navigate, location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSettings(isLogged ? loggedInOptions : loggedOutOptions);
    } else {
      setSettings(loggedOutOptions);
    }
  }, [isLogged]);

  // useEffect(() => {
  //   try{
  //   const response = axios.get('/dashboard/get_user_info');
  //   setFormData({
  //     user_name: response.data.user_name,
  //     user_email: response.data.user_email,
  //     user_pic: response.data.user_pic,
  //   });
  // } catch (error) {
  //   console.error('Error fetching user info:', error);}
  // });

  return (
    <div className="Template">
      <div className="Header">
        <div className="Nav-Main">
          <div className="Nav-Main-Left">
            <Navbar expand="lg" style={{
              margin: "0px",
              padding: "0px",
            }}>
              <Navbar.Brand as={Link} to="/">
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
                    <Nav.Link as={Link} to="/" className="custom-link">
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
                    <Nav.Link
                      as={Link}
                      to="/search"
                      className="custom-link"
                    >
                      Explore
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/about"
                      className="custom-link"
                    >
                      About us
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/contact"
                      className="custom-link"
                    >
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
                  <Image src={'./assets/nyu.jpg'} roundedCircle fluid />
                </Dropdown.Toggle>

                <Dropdown.Menu align="right">
                  <Dropdown.Item disabled>
                    <div className="avatar-dropdown-header">

                      <Image src={'./assets/nyu.jpg'} roundedCircle fluid />

                      <div>
                        {/* <div className="username">Username</div>
                        <div className="email">email@example.com</div> */}
                      </div>
                    </div>
                     {/* <div className="avatar-dropdown-header">
                  {formData.user_pic ? (
                    <Image src={formData.user_pic} roundedCircle fluid />
                  ) : (
                    <Image src={'./assets/nyu.jpg'} roundedCircle fluid />
                  )}
                  <div>
                    {formData.user_name && (
                      <div className="username">{formData.user_name}</div>
                    )}
                    {formData.user_email && (
                      <div className="email">{formData.user_email}</div>
                    )}
                  </div>
                </div> */}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {/* <Dropdown.Item href="/dashboard">Profile</Dropdown.Item>
                  <Dropdown.Item href="/signout">Sign Out</Dropdown.Item> */}
                  {settings.map((setting) => (
                    <Dropdown.Item
                      as={Link}
                      to={pagesLinks[setting]}
                      state={routeToState[pagesLinks[setting]]}
                      key={setting}
                    >
                      {setting}
                    </Dropdown.Item>
                  ))}
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
