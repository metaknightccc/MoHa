import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';
import { Container, Col, Row, Tab, ListGroup } from 'react-bootstrap';
import Profile from './Profile'
import AddCoursePage from './AddCoursePage';
import ModCoursePage from './ModCoursePage';
import MyCoursePage from './MyCoursePage';
import ClassListPage from './ClassListPage';
import { useNavigate } from 'react-router-dom';
import useToken from "./hook/useToken";
import Security from './Security';


const Dashboard = () => {
  const navigate = useNavigate();
  const [ token, saveToken, removeToken ] = useToken();
  const [profileData, setProfileData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [securityData, setSecurityData] = useState(null);
  const [classlistData, setClasslistData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const endpoint = '/dashboard';
  const coursemod = '/course';

  useEffect(() => {
    setLoading(true);
    axios.get('/dashboard')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          setUserType(response.data.user_type);
          setLoading(false);
        } 
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log('Unauthorized');
          removeToken();
          navigate('/login', { state: { message: 'Unauthorized' } });
        }
        else if (error.status === 302) {
          navigate('/login', { state: { message: 'Unauthorized' } });
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
    } else if (key === '#classlist' && classlistData == null) {
      try {
        axios.get("/course_class/get_classes")
        .then(response => {
          setClasslistData(response.data);
        })
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
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
                {
                  !loading && (
                    <>
                      <ListGroup.Item action href="#profile">
                        Profile
                      </ListGroup.Item>
                      <ListGroup.Item action href="#course">
                        My Courses
                      </ListGroup.Item>
                      <ListGroup.Item action href="#security">
                        Security
                      </ListGroup.Item>
                      <ListGroup.Item action href="#classlist">
                        Classlist
                      </ListGroup.Item>
                      {
                        // Check if the user is a tutor
                        userType === 'tutor' && (
                          <ListGroup.Item action href="#add_course">
                            Add Course
                          </ListGroup.Item>
                        )
                      }
                    </>
                  )
                }
              </ListGroup>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                {
                  !loading && (
                    <>
                      <Tab.Pane eventKey="#profile">
                        <h3>Profile</h3>
                        <Profile />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#course">
                        <h3>My Courses</h3>
                        <MyCoursePage />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#security">
                        <h3>Security</h3>
                        <Security />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#classlist">
                        <h3>Classlist</h3>
                        {classlistData ? <ClassListPage data={classlistData} userType={userType}/> : 'Loading...'}
                      </Tab.Pane>
                      {
                        userType === 'tutor' && (
                          <Tab.Pane eventKey="#add_course">
                            <h3>Add Course</h3>
                            <AddCoursePage />
                          </Tab.Pane>
                        )
                      }
                    </>
                  )
                }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Dashboard;