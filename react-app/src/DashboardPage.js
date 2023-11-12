import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';
import { Container, Col, Row, Tab, ListGroup } from 'react-bootstrap';
import Profile from './Profile' 
import AddCoursePage from './AddCoursePage';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [securityData, setSecurityData] = useState(null);
  const endpoint = '/dashboard';

  useEffect(() => {
    axios.get('/dashboard')
      .then(response => {
        if(response.status === 200) {
          console.log(response.data);
        }
      })
      .catch(error => {
        if(error.response.status === 401) {
          console.log('Unauthorized');
          navigate('/login');
        }
      });
  }, []);

  const fetchData = (key) => {
    if (key === '#profile' && profileData == null) {
      axios.get(endpoint)
        .then(response => {
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    } else if (key === '#course' && courseData == null) {
      axios.get(endpoint + '/course')
        .then(response => {
          setCourseData(response.data);
        })
        .catch(error => {
          console.error('Error fetching course data:', error);
        });
    } else if (key === '#security' && securityData == null) {
      axios.get(endpoint + '/security')
        .then(response => {
          setSecurityData(response.data);
        })
        .catch(error => {
          console.error('Error fetching security data:', error);
        });
    }
  };

  return (
    <div className="dashboard">

      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="#profile" onSelect={fetchData}>
          <Row>
            <Col sm={12} className="border-bottom-col">
              <h2>Home Page</h2>
            </Col>
          </Row>
          <Row className='padding-top-row'>
            <Col sm={2} >
              <ListGroup>
                <ListGroup.Item action href="#profile">
                  Profile
                </ListGroup.Item>
                <ListGroup.Item action href="#course">
                  My Courses
                </ListGroup.Item>
                <ListGroup.Item action href="#security">
                  Security
                </ListGroup.Item>
              
                <ListGroup.Item action href="#add_course">
                  Add Course
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="#profile">
                  <h3>Profile</h3>
                  <Profile/>
                </Tab.Pane>
                <Tab.Pane eventKey="#course">
                  <h3>My Courses</h3>
                  {courseData ? <div>{JSON.stringify(courseData)}</div> : 'Loading...'}
                </Tab.Pane>
                <Tab.Pane eventKey="#security">
                  <h3>Security</h3>
                  {securityData ? <div>{JSON.stringify(securityData)}</div> : 'Loading...'}
                </Tab.Pane>
                <Tab.Pane eventKey="#add_course">
                  <h3>Add Course</h3>
                  <AddCoursePage />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Dashboard;