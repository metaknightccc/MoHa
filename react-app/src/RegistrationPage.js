import React, { useState } from 'react';
import './RegistrationPage.css';

function RegistrationPage() {
  const [isStudent, setIsStudent] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    socialSecurityNumber: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const endpoint = isStudent ? "/register_student" : "/register_tutor";
    fetch(endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error registering:", error);
    });
  };

  return (
    <div className="container">
      <button onClick={() => setIsStudent(!isStudent)}>
        Switch to {isStudent ? "Tutor" : "Student"} Registration
      </button>
      <h1>{isStudent ? "Student Registration" : "Tutor Registration"}</h1>
      <form onSubmit={handleRegistrationSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" onChange={handleInputChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" onChange={handleInputChange} />
        </label>
        <label>
          Username:
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        {!isStudent && (
          <>
            <label>
              Email:
              <input type="email" name="email" onChange={handleInputChange} />
            </label>
            <label>
              Phone Number:
              <input type="tel" name="phoneNumber" onChange={handleInputChange} />
            </label>
            <label>
              Social Security Number:
              <input type="text" name="socialSecurityNumber" onChange={handleInputChange} />
            </label>
          </>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
