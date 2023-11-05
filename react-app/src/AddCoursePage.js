import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCoursePage.css';

function AddCoursePage() {
  const [subjectName, setSubjectName] = useState('');
  const [existingSubjects, setExistingSubjects] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Fetch existing subjects from your TurboGears backend
    axios.get('/dashboard/get_existing_subjects')
      .then(response => {
        setExistingSubjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching existing subjects:', error);
      });
  }, []);

  const handleAddCourse = () => {
    // Handle the form submission here, including subjectName and other data
    console.log('Subject Name:', subjectName);
    console.log('Course Name:', courseName);
    console.log('Course Type:', courseType);
    console.log('Price:', price);
    // ... handle the submission ...
  };

  return (
    <div className="add-course-page">
      <h3>Add Course</h3>
      <form>
        <div className="form-group">
          <label>Subject Name</label>
          <select
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          >
            <option value="">Select an existing subject</option>
            {existingSubjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Course Type</label>
          <input
            type="text"
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </form>
      <button onClick={handleAddCourse}>Add Course</button>
    </div>
  );
}

export default AddCoursePage;
