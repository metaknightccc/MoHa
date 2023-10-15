import React, { Component } from 'react';
import './RegisterationPage.css'
class StudentRegistrationPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Send a registration request to the server for student registration
    // Implement your registration request here
  };

  render() {
    return (
      <div className="container">
        <h1>Student Registration</h1>
        <form onSubmit={this.handleRegistrationSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" onChange={this.handleInputChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" onChange={this.handleInputChange} />
          </label>
          <label>
            Username:
            <input type="text" name="username" onChange={this.handleInputChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={this.handleInputChange} />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default StudentRegistrationPage;
