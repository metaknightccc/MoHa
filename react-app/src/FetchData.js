import React, { useState, useEffect } from 'react';

function FetchData() {
//   const [tutors, setTutors] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
   let res = null;
  // Fetch data when component mounts
  useEffect(() => {
    // Example endpoint: Adjust to your actual endpoint
    fetch('/tutor/insert_fake_data')
      .then(response => console.log(response))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return null;
}

export default FetchData;
