import React, { useState } from 'react';
import './RegistrationPage.css';

function RegistrationPage() {
  const [isStudent, setIsStudent] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    social_security_number: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const endpoint = isStudent ? "/reg/register_student" : "/reg/register_tutor";
    fetch(endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .catch((error) => console.error("Error registering:", error));
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
          <input type="text" name="first_name" onChange={handleInputChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" onChange={handleInputChange} />
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
              <input type="tel" name="phone_number" onChange={handleInputChange} />
            </label>
            <label>
              Social Security Number:
              <input type="text" name="social_security_number" onChange={handleInputChange} />
            </label>
          </>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
